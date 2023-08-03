import React from 'react';
import useScrollAnimation from "../../utils/useScrollAnimation";

const AnimeCardList = ({animeList}) => {
    const cardContainerRef = useScrollAnimation();

    return (
        <div
            ref={cardContainerRef}
            className="overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar relative"
            style={{cursor: 'grab'}}
        >
            <ul className="list-none p-0 m-0" style={{display: 'inline-flex'}}>
                {animeList.map((anime) => (
                    <li
                        key={anime.id}
                        className="group w-64 h-96 relative border border-gray-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 m-2"
                    >
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                            <img
                                src={anime.picture}
                                className="h-full w-full object-cover object-center"
                                alt={anime.title}
                                style={{filter: 'brightness(90%)'}}
                            />
                        </div>
                        <div className="p-4 bg-black flex-grow">
                            <h3 className="text-lg font-semibold line-clamp-2">
                                <a href={'/animes/' + anime.id} className="text-white">
                                    <span aria-hidden="true" className="absolute inset-0"/>
                                    {anime.title}
                                </a>
                            </h3>
                        </div>
                        <div className="p-4 bg-black">
                            <div className="flex items-center justify-between text-gray-300">
                                <div className="flex items-center">
                                    {anime.status === 'released' ? (
                                        <p className="text-green-400 mr-2">Released</p>
                                    ) : anime.status === 'ongoing' ? (
                                        <p className="text-yellow-400 mr-2">Ongoing</p>
                                    ) : null}
                                    <p>{anime.year}</p>
                                </div>
                                <div className="text-gray-400 text-sm font-medium">
                                    <p>Rating: {anime.rating}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimeCardList;
