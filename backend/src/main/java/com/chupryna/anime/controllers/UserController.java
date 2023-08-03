package com.chupryna.anime.controllers;

import com.chupryna.anime.dto.UserDTO;
import com.chupryna.anime.entity.User;
import com.chupryna.anime.exceptions.EmailUsedException;
import com.chupryna.anime.exceptions.PasswordsDoNotMatchException;
import com.chupryna.anime.exceptions.UserNotFoundException;
import com.chupryna.anime.exceptions.UsernameUsedException;
import com.chupryna.anime.service.UserService;
import com.chupryna.anime.util.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final UserValidator userValidator;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, UserValidator userValidator) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userValidator = userValidator;
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

    @GetMapping("/{id}")
    private ResponseEntity<User> getUser(@PathVariable String id) {
        Optional<User> user = userService.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException("There is no such user in db");
        }
        return ResponseEntity.ok().body(user.get());
    }

    @PostMapping("/{id}")
    private ResponseEntity<Void> editUser(@RequestBody UserDTO userDTO,
                                          @PathVariable String id,
                                          BindingResult bindingResult) {
        Optional<User> oldUser = userService.findById(id);
        userDTO.setRole(oldUser.get().getRole());
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
}
