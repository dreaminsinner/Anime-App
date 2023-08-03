import React from 'react';

const AnimeSearchInput = ({ searchText, setSearchText, searchResults }) => {
    return (
        <div className="w-full flex justify-center items-center p-4">
            <input
                type="text"
                placeholder="Search Anime..."
                className="w-96 px-4 py-2 text-white bg-gray-800 rounded-md"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {searchResults.length === 0 && (
                <p className="text-white ml-2">No anime found.</p>
            )}
        </div>
    );
};

export default AnimeSearchInput;
