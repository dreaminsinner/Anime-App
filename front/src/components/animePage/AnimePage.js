import React from 'react';
import SideBar from '../home/SideBar';
import Footer from '../home/Footer';
import AnimeInfo from './AnimeInfo';
import LatestAnime from './LatestAnime';

const AnimePage = () => {
    return (
        <div className="bg-black text-white grid grid-cols-10 gap-0">
            <div className="col-span-8"> {/* Задаем 3 колонки для AnimeInfo */}
                <AnimeInfo />
            </div>
            <div className="col-span-2"> {/* Задаем 2 колонки для LatestAnime */}
                <LatestAnime />
            </div>
            <SideBar /> {/* Полная ширина для SideBar */}
            <footer className="col-span-full"> {/* Занимает всю ширину страницы */}
                <Footer />
            </footer>
        </div>
    );
};

export default AnimePage;
