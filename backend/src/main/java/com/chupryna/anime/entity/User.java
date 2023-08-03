package com.chupryna.anime.entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;
import org.wildfly.common.annotation.NotNull;


import java.util.Date;


@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Component
public class User {

    @Id
    private String id;

    private String picture;

    @NotNull
    @Email
    private String email;

    private String password;

    @NotNull
    private String username;

    private String firstName;

    private String lastName;

    private Date birthday;

    private String role;

}
