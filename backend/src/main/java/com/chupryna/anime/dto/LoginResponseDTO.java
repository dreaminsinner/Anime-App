package com.chupryna.anime.dto;


import com.chupryna.anime.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {

    private String token;

    private String role;

    private String id;
}
