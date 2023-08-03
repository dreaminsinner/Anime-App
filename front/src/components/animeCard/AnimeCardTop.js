import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AnimeCard.css';
import AnimeCardList from "./AnimeCard";

const AnimeCardNew = () => {
    const [topAnimeList, setAnimeList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/anime/getTop', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAnimeList(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <div className="bg-black font-sans text-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h2 className="text-3xl font-semibold tracking-tight mb-8">All time goats</h2>
                <AnimeCardList animeList={topAnimeList}/>
            </div>
        </div>
    );
};

export default AnimeCardNew;
