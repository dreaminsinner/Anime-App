package com.chupryna.anime.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;
import org.wildfly.common.annotation.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
@Document(collection = "anime")
public class Anime {

    @Id
    private String id;

    @NotNull
    private String title;

    @ElementCollection
    private List<String> genres;

    private String picture;

    @Max(10)
    @Min(0)
    private Double rating;

    private String studio;

    @Min(0)
    private int episodes;

    private String description;

    private String status;


    private String year;

    public Anime(String title, String year) {
        this.title = title;
        this.year = year;
    }
}
