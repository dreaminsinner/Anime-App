package com.chupryna.anime.service;

import com.chupryna.anime.dto.AnimeDTO;
import com.chupryna.anime.entity.Anime;
import com.chupryna.anime.repositories.AnimeRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AnimeService{

    private final AnimeRepository animeRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public AnimeService(AnimeRepository animeRepository, ModelMapper modelMapper) {
        this.animeRepository = animeRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public void saveAnimeDTO(AnimeDTO animeDto) {
        animeRepository.save(modelMapper.map(animeDto, Anime.class));
    }

    public List<Anime> findAll(){
        return animeRepository.findAll();
    }

    public List<Anime> findByGenre(List<String> genre){
        return animeRepository.findAllByGenresIn(Collections.singleton(genre));
    }

    public List<Anime> findByYear(List<String> year){
        return animeRepository.findAllByYearIn(year);
    }

    public Optional<Anime> findByTitle(String title){
        return animeRepository.findByTitle(title);
    }

    @Transactional
    public void deleteAnime(String title){
        animeRepository.delete(animeRepository.findByTitle(title).get());
    }

    @Transactional
    public void saveAllAnime(List<Anime> animes){
        animeRepository.saveAll(animes);
    }

    @Transactional
    public void saveAnime(Anime anime){
        animeRepository.save(anime);
    }

    public Optional<Anime> findById(String id){
        return animeRepository.findById(id);
    }

}
