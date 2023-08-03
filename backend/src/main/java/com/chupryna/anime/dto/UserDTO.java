package com.chupryna.anime.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String id;

    @NotEmpty(message = "Login can not be empty")
    private String username;


    private String password;


    private String passwordConfirmation;

    @NotEmpty(message = "Email can not be empty")
    @Email(message = "not valid email")
    private String email;

    @Size(min = 2, max = 30, message = "Wrong login length")
    private String firstName;

    @Size(min = 2, max = 30, message = "Wrong login length")
    private String lastName;

    private Date birthday;

    private String role;

    private String age;

    public void UserDto(
            String id,
            String username,
            String password,
            String email,
            String firstName,
            String lastName,
            Date birthday,
            String role
    ) {
        this.age = String.valueOf(Period.between(birthday.toLocalDate(), LocalDate.now()).getYears());
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.role = role;
    }

    public UserDTO(String username, String password, String passwordConfirmation, String email) {
        this.username = username;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.email = email;
    }

}
