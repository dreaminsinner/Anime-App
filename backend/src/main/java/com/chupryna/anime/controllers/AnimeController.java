package com.chupryna.anime.controllers;

import com.chupryna.anime.dto.AnimeDTO;
import com.chupryna.anime.dto.GenreDTO;
import com.chupryna.anime.entity.Anime;
import com.chupryna.anime.exceptions.AnimeAlreadyExistsException;
import com.chupryna.anime.exceptions.AnimeNotFoundException;
import com.chupryna.anime.service.AnimeService;
import com.chupryna.anime.util.AnimeValidator;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;


@RequestMapping("/anime")
@RestController
public class AnimeController {

    private final AnimeValidator animeValidator;

    private final AnimeService animeService;

    @Autowired
    public AnimeController(AnimeValidator animeValidator, AnimeService animeService) {
        this.animeValidator = animeValidator;
        this.animeService = animeService;
    }

    @GetMapping("/getAll")
    private ResponseEntity<List<Anime>> receiveAllAnimes() {
        return ResponseEntity.ok().body(animeService.findAll());
    }

    @GetMapping("/getTop")
    private ResponseEntity<List<Anime>> receiveTopAnimes() {
        return ResponseEntity.ok().body(animeService
                .findAll()
                .stream()
                .sorted(Comparator.comparing(Anime::getRating).reversed())
                .filter(x -> x.getRating() > 8)
                .toList());
    }

    @GetMapping("/{id}")
    private ResponseEntity<Anime> findById(@PathVariable String id) {
        Optional<Anime> anime = animeService.findById(id);
        if (anime.isEmpty()) {
            throw new AnimeNotFoundException("There is no such anime in db!");
        }
        return ResponseEntity.ok().body(anime.get());
    }

    @PostMapping("/add")
    private ResponseEntity<Void> addAnime(@RequestBody AnimeDTO animeDTO,
                                          BindingResult bindingResult) {
        animeValidator.validate(animeDTO, bindingResult);
        if (bindingResult.hasFieldErrors("animeName")) {
            throw new AnimeAlreadyExistsException("This anime already exists!");
        }
        animeService.saveAnimeDTO(animeDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/findByGenre")
    private ResponseEntity<List<Anime>> findAnimeByGenre(@RequestBody GenreDTO genres) {
        List<Anime> anime = animeService.findByGenre(genres.getGenres());
        if (anime.isEmpty()) {
            throw new AnimeNotFoundException("There is no anime in such genre!");
        }
        return ResponseEntity.ok().body(anime);
    }

    @PostMapping("/findByYear")
    private ResponseEntity<List<Anime>> findAnimeByAnime(@RequestBody List<String> years) {
        List<Anime> anime = animeService.findByYear(years);
        if (anime.isEmpty()) {
            throw new AnimeNotFoundException("There is no anime with such year of release!");
        }
        return ResponseEntity.ok().body(anime);
    }

    @GetMapping("/findByStudio")
    private ResponseEntity<List<Anime>> findAnimeByStudio(@RequestBody GenreDTO genres) {
        List<Anime> anime = animeService.findByGenre(genres.getGenres());
        if (anime.isEmpty()) {
            throw new AnimeNotFoundException("There is no anime in such genre!");
        }
        return ResponseEntity.ok().body(anime);
    }

    @PatchMapping("/{title}")
    private ResponseEntity<Void> editAnime(@RequestBody AnimeDTO animeDTO) {
        animeService.saveAnimeDTO(animeDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{title}")
    private ResponseEntity<Void> deleteAnime(@PathVariable String title) {
        Optional<Anime> anime = animeService.findByTitle(title);
        if (anime.isEmpty()) {
            throw new AnimeNotFoundException("There is no anime with such title!");
        }
        animeService.deleteAnime(title);
        return ResponseEntity.ok().build();
    }

    private List<Anime> combineLists(List<String> titles, List<String> years) {
        List<Anime> animeList = new ArrayList<>();
        int size = Math.min(titles.size(), years.size());
        for (int i = 0; i < size; i++) {
            String title = titles.get(i);
            String year = years.get(i);
            animeList.add(new Anime(title, year));
        }
        return animeList;
    }

    private void parseAnimes(List<String> animeIds) throws IOException {
        for (String element :
                animeIds) {
            String url = "https://shikimori.me/animes/" + element;
            Document doc = Jsoup.connect(url).get();
            Elements animeElements = doc.select("article.c-anime");

        }
    }

    private List<String> parseIds() throws IOException {
        String url = "https://shikimori.me/animes/page/";
        List<String> animeIds = new ArrayList<>();
        for (int i = 1; i < 100; i++) {
            Document doc = Jsoup.connect(url + i).get();
            Elements animeElements = doc.select("article.c-anime");
            animeIds = animeElements.stream().map(Element::id).toList();
        }
        return animeIds;
    }

    @GetMapping("/parse")
    private ResponseEntity<Void> parseAnime() {
        String url = "https://shikimori.me/animes/page";
        try {
            Document doc = Jsoup.connect(url).get();
            Elements animeElements = doc.select("article.c-anime");
            List<String> animeTitles = new ArrayList<>(animeElements.stream()
                    .map(element -> element.select("span.name-en").text())
                    .toList());
            List<String> animeIds = parseIds();
            List<String> animeYears = new ArrayList<>(animeElements.stream()
                    .map(element -> (element.select("span.right").text()))
                    .toList());
            List<Anime> animeList = combineLists(animeTitles, animeYears);
            animeService.saveAllAnime(animeList);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(AnimeNotFoundException.class)
    private ResponseEntity<String> handleException(AnimeNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(AnimeAlreadyExistsException.class)
    private ResponseEntity<String> handleException(AnimeAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
