package com.chupryna.anime.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Document(collection = "studios")
@AllArgsConstructor
@Component
@NoArgsConstructor
public class Studio {

    @Id
    private String id;

    private String name;

    @ElementCollection
    private List<String> animes;

    private String picture;
}
