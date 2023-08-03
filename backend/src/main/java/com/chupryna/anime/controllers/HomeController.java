package com.chupryna.anime.controllers;

import com.chupryna.anime.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    private final AnimeService animeService;

    @Autowired
    public HomeController(AnimeService animeService) {
        this.animeService = animeService;
    }

}
