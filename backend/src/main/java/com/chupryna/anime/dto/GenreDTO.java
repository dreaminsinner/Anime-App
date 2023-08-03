package com.chupryna.anime.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class GenreDTO {

    private List<String> genres;

}
