package com.chupryna.anime.dto;

import com.chupryna.anime.entity.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimeDTO {

    private String id;

    private String title;

    private List<String> genres;

    private String picture;

    private String studio;

    private Double rating;

    private int episodes;

    private String description;

    private String status;

    private String year;

}
