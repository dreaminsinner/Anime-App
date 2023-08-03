package com.chupryna.anime.repositories;

import com.chupryna.anime.entity.Anime;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface AnimeRepository extends MongoRepository<Anime, String> {

    Optional<List<Anime>> findAllByStudio(String studio);

    List<Anime> findAllByGenresIn(Collection<List<String>> genres);

    Optional<Anime> findByTitle(String title);

    List<Anime> findAllByYearIn(Collection<String> year);

}
