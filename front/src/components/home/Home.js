import React from 'react';
import AnimeCardNew from "../animeCard/AnimeCardNew";
import AnimeCardTop from "../animeCard/AnimeCardTop";
import Footer from "./Footer";
import SideBar from "./SideBar";
import './Home.css';

const Home = () => {


    return (
        <div>
            <div>
                <AnimeCardNew/>
            </div>
            <div>
                <SideBar/>
            </div>
            <div>
                <AnimeCardTop/>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default Home;