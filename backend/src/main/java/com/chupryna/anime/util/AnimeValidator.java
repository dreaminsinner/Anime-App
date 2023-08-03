package com.chupryna.anime.util;

import com.chupryna.anime.dto.AnimeDTO;
import com.chupryna.anime.entity.Anime;
import com.chupryna.anime.repositories.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Optional;

@Component
public class AnimeValidator implements Validator {


    private final AnimeRepository animeRepository;

    @Autowired
    public AnimeValidator(AnimeRepository animeRepository) {
        this.animeRepository = animeRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return AnimeDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        AnimeDTO animeDTO = (AnimeDTO) target;
        checkAnimeAlreadyRegistered(animeDTO.getTitle(), errors);
    }

    private void checkAnimeAlreadyRegistered(String animeName, Errors errors) {
        Optional<Anime> existingAnime = animeRepository.findByTitle(animeName);
        if (existingAnime.isPresent()) {
            errors.rejectValue("animeName",
                    "error.anime",
                    "Anime is already registred!");
        }
    }

}
