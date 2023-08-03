package com.chupryna.anime.controllers;

import com.chupryna.anime.dto.UserDTO;
import com.chupryna.anime.entity.User;
import com.chupryna.anime.exceptions.*;
import com.chupryna.anime.service.UserService;
import com.chupryna.anime.util.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/adminHome")
public class AdminController {

    private final UserValidator userValidator;

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;

    @Autowired
    public AdminController(UserValidator userValidator, PasswordEncoder passwordEncoder, UserService userService) {
        this.userValidator = userValidator;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    private void checkErrors(BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors("username")) {
            throw new UsernameUsedException("This username is already registered");
        }
        if (bindingResult.hasFieldErrors("email")) {
            throw new EmailUsedException("This email is already registered");
        }
        if (bindingResult.hasFieldErrors("password")) {
            throw new PasswordsDoNotMatchException("Passwords do not match");
        }
    }

    @GetMapping("/getAll")
    private List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/editUser/{username}")
    private ResponseEntity<User> receiveUser(@PathVariable String username) {
        Optional<User> user = userService.findUserByUsername(username);
        if (user.isEmpty()) {
            throw new UserNotFoundException("There is no user with such username");
        }
        return ResponseEntity.ok().body(user.get());
    }

    @PatchMapping("/editUser/{id}")
    private ResponseEntity<Void> editUser(@RequestBody UserDTO userDTO,
                                          @PathVariable String id,
                                          BindingResult bindingResult) {
        Optional<User> oldUser = userService.findById(id);
        if (userDTO.getPassword() == null) {
            userDTO.setPassword(oldUser.get().getPassword());
            userDTO.setPasswordConfirmation(oldUser.get().getPassword());
        }
        userValidator.validate(userDTO, bindingResult);
        checkErrors(bindingResult);
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userService.saveUser(userDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteUser/{username}")
    private ResponseEntity<Void> removeUser(@PathVariable String username,
                                            Authentication authentication) {
        if (username.equals(authentication.getName())) {
            throw new AdminCanNotDeleteHimselfException("Admin can not delete himself");
        }
        Optional<User> user = userService.findUserByUsername(username);
        if (user.isEmpty()) {
            throw new UserNotFoundException("Such user doesn't exist");
        }
        userService.deleteUser(user.get());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/addUser")
    private ResponseEntity<Void> addUser(@RequestBody UserDTO userDto,
                                         BindingResult bindingResult) {
        userValidator.validate(userDto, bindingResult);
        checkErrors(bindingResult);
        userService.saveUser(userDto);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(UserNotFoundException.class)
    private ResponseEntity<String> handleException(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(UsernameUsedException.class)
    private ResponseEntity<String> handleException(UsernameUsedException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(EmailUsedException.class)
    private ResponseEntity<String> handleException(EmailUsedException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(PasswordsDoNotMatchException.class)
    private ResponseEntity<String> handleException(PasswordsDoNotMatchException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(AdminCanNotDeleteHimselfException.class)
    private ResponseEntity<String> handleException(AdminCanNotDeleteHimselfException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

}
