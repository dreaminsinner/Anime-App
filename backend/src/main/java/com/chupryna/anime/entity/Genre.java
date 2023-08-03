package com.chupryna.anime.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
@Document(collection = "genres")
@Component
public class Genre {

    @Id
    private String id;

    @NotNull
    private String name;

    @ElementCollection
    private List<Anime> animes;

}
