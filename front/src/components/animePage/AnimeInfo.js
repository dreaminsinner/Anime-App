import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FaBuilding, FaCalendarAlt, FaInfoCircle, FaListAlt, FaStar, FaTags} from 'react-icons/fa';

const AnimeInfo = () => {
    const [animeData, setAnimeData] = useState(null);

    useEffect(() => {
        const url = window.location.href;
        const id = url.split('/').pop();
        const token = localStorage.getItem('token');
        const fetchAnimeData = async () => {
            axios
                .get(`http://localhost:8080/anime/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setAnimeData(response.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    setAnimeData(null);
                });
        };

        fetchAnimeData();
    }, []);

    if (animeData === null) {
        return <div>Loading...</div>;
    }

    // Join genres into a single string separated by commas
    const genresString = animeData.genres.join(', ');

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="mx-auto p-8">
                <h1 className="text-4xl font-bold mb-2 ml-72">{animeData.title}</h1>
                <br/>
                <br/>
                <div className="flex flex-col md:flex-row mb-4">
                    <div className="mb-2 md:mb-0 md:ml-[5%]">
                        <img
                            src={animeData.picture}
                            alt={animeData.title}
                            className="w-96 h-96 object-contain rounded-md"
                        />
                    </div>
                    <div className="text-lg flex-grow border border-white rounded-md  md:p-4">
                        <div className="flex items-center mb-2">
                            <FaListAlt className="text-xl mr-1"/>
                            <span className="font-semibold">Episodes: {animeData.episodes}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaInfoCircle className="text-xl mr-1"/>
                            <span className="font-semibold">Status: {animeData.status}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-xl mr-1"/>
                            <span className="font-semibold">Release year: {animeData.year}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaStar className="text-xl mr-1"/>
                            <span className="font-semibold">Rating: {animeData.rating}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaBuilding className="text-xl mr-1"/>
                            <span className="font-semibold">Studio: {animeData.studio}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaTags className="text-xl mr-1"/>
                            <span className="font-semibold">Genres: {genresString}</span>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="border border-white rounded-md p-4 mt-4 md:ml-[31%]">
                    <p className="font-semibold">Description:</p>
                    <p>{animeData.description}</p>
                </div>
            </div>
        </div>
    );
};

export default AnimeInfo;
