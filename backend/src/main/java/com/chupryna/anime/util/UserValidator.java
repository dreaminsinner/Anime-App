package com.chupryna.anime.util;

import com.chupryna.anime.dto.UserDTO;
import com.chupryna.anime.entity.User;
import com.chupryna.anime.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Optional;

@Component
public class UserValidator implements Validator {

    private final UsersRepository usersRepository;

    @Autowired
    public UserValidator(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return UserDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserDTO userDto = (UserDTO) target;
        checkEmailAlreadyRegistered(userDto.getEmail(), userDto.getId(), errors);
        checkUsernameAlreadyRegistered(userDto.getUsername(), userDto.getId(), errors);
        checkPasswordsMatch(userDto.getPassword(), userDto.getPasswordConfirmation(), errors);
    }

    private void checkEmailAlreadyRegistered(String email, String userId, Errors errors) {
        Optional<User> existingUser = usersRepository.findByEmail(email);
        if (existingUser.isPresent() && !existingUser.get().getId().equals(userId)) {
            errors.rejectValue("email", "error.user", "This email is already registered");
        }
    }

    private void checkUsernameAlreadyRegistered(String username, String userId, Errors errors) {
        Optional<User> existingUser = usersRepository.findByUsername(username);
        if (existingUser.isPresent() && !existingUser.get().getId().equals(userId)) {
            errors.rejectValue("username", "error.user", "This username is already registered");
        }
    }

    private void checkPasswordsMatch(String password, String passwordConfirmation, Errors errors) {
        if (!password.equals(passwordConfirmation)) {
            errors.rejectValue("password", "error.user", "Passwords do not match");
        }
    }

}
