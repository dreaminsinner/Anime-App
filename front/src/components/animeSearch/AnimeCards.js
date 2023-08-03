import React from 'react';

const AnimeCards = ({ animeList }) => {
    const splitIntoRows = (list, itemsPerRow) => {
        const rows = [];
        for (let i = 0; i < list.length; i += itemsPerRow) {
            const row = list.slice(i, i + itemsPerRow);
            rows.push(row);
        }
        return rows;
    };

    const animeRows = splitIntoRows(animeList, 5);

    return (
        <div className="flex justify-center bg-black">
            <div className="grid grid-cols-5 gap-5 bg-black p-16">
                {animeRows.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {row.map((anime) => (
                            <div
                                key={anime.id}
                                className="group flex flex-col justify-between w-64 h-96 relative border border-gray-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 m-1 bg-black"
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                                    <img
                                        src={anime.picture}
                                        className="h-full w-full object-cover object-center"
                                        alt={anime.title}
                                        style={{ filter: 'brightness(90%)' }}
                                    />
                                </div>
                                <div className="p-4 bg-black flex-grow">
                                    <h3 className="text-lg font-semibold line-clamp-1 overflow-hidden">
                                        <a href={'/animes/' + anime.id} className="text-white">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {anime.title.length > 30 ? `${anime.title.slice(0, 30)}...` : anime.title}
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
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AnimeCards;
