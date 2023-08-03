import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LatestAnime = () => {
    const [latestAnime, setLatestAnime] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchAnimeData = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/anime/findByYear`, ['2023'] , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const randomAnime = getRandomAnime(response.data, 10);
                setLatestAnime(randomAnime);
            } catch (error) {
                console.log(error.response.data);
                setLatestAnime([]);
            }
        };
        fetchAnimeData();
    }, []);

    const getRandomAnime = (animeList, count) => {
        if (animeList.length <= count) {
            return animeList;
        }
        const shuffled = animeList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Функция для ограничения длины названия
    const limitTitleLength = (title) => {
        const maxLength = 34;
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    return (
        <div className="bg-black text-white">
            <div className="flex flex-col items-center gap-4 p-6 ml-auto">
                <h2 className="text-xl font-semibold">Latest Anime</h2>
                <div>
                    {latestAnime.map((anime) => (
                        <a href={`/animes/${anime.id}`} key={anime.id} className="flex items-center gap-2 mb-4">
                            <img
                                src={anime.picture}
                                alt={anime.title}
                                className="w-16 h-16 object-contain rounded-md"
                            />
                            <p>{limitTitleLength(anime.title)}</p> {/* Используем функцию для ограничения длины названия */}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestAnime;
