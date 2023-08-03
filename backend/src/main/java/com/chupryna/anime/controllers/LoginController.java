package com.chupryna.anime.controllers;

import com.chupryna.anime.dto.LoginResponseDTO;
import com.chupryna.anime.dto.UserDTO;
import com.chupryna.anime.exceptions.EmailUsedException;
import com.chupryna.anime.exceptions.PasswordsDoNotMatchException;
import com.chupryna.anime.exceptions.UsernameUsedException;
import com.chupryna.anime.service.UserService;
import com.chupryna.anime.util.JWTUtil;
import com.chupryna.anime.util.UserValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;

    private final UserValidator userValidator;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JWTUtil jwtUtil, PasswordEncoder passwordEncoder, UserService userService, UserValidator userValidator) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
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

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> performLogin(@RequestBody UserDTO userDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDto.getUsername(),
                        userDto.getPassword());
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Wrong username/password");
        }
        String token = jwtUtil.generateToken(userDto.getUsername());
        String role = userService.findUserByUsername(userDto.getUsername()).get().getRole();
        String id = userService.findUserByUsername(userDto.getUsername()).get().getId();
        return ResponseEntity.ok().body(new LoginResponseDTO(token, role, id));
    }

    @PostMapping("/registration")
    public ResponseEntity<LoginResponseDTO> performRegistration(@RequestBody @Valid UserDTO userDto,
                                                                BindingResult bindingResult) {
        userValidator.validate(userDto, bindingResult);
        checkErrors(bindingResult);
        userDto.setRole("USER");
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userService.saveUser(userDto);
        String token = jwtUtil.generateToken(userDto.getUsername());
        String role = userService.findUserByUsername(userDto.getUsername()).get().getRole();
        String id = userService.findUserByUsername(userDto.getUsername()).get().getId();

        return ResponseEntity.ok().body(new LoginResponseDTO(token, role, id));
    }

    @ExceptionHandler(BadCredentialsException.class)
    private ResponseEntity<String> handleException(BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
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
