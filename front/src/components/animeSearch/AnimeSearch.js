import React, { useEffect, useState } from 'react';
import SideBar from '../home/SideBar';
import Footer from '../home/Footer';
import AnimeCards from './AnimeCards';
import AnimeSearchInput from './AnimeSearchInput';
import axios from 'axios';

const AnimeSearch = () => {
    const [allAnime, setAllAnime] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/anime/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAllAnime(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    useEffect(() => {
        const filteredAnime = allAnime.filter((anime) =>
            anime.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredAnime);
    }, [searchText, allAnime]);

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <AnimeSearchInput
                searchText={searchText}
                setSearchText={setSearchText}
                searchResults={searchResults}
            />
            <div className="flex-grow flex justify-center items-start">
                <AnimeCards
                    animeList={searchResults.length > 0 ? searchResults : allAnime}
                />
            </div>
            <SideBar/>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default AnimeSearch;
