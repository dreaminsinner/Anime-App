import React, { useState, useEffect } from 'react';
import { FaCog, FaDragon, FaUser } from 'react-icons/fa';
import {GiDungeonGate, GiCastle, GiBookmark} from 'react-icons/gi';

const SideBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [getId, setId] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('id');
        setIsAdmin(role === 'ADMIN');
        setId(id);
    }, []);

    return (
        <nav className="z-20 flex fixed top-96 left-6 -translate-y-1/2 flex-col gap-4 border-t dark:border-slate-600/60 p-2.5 shadow-lg backdrop-blur-lg border border-white border-opacity-25">
            <a
                href={'/profile/' + getId}
                className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-white dark:text-sky-50 bg-black dark:bg-gray-900"
            >
                <FaUser className="w-6 h-6 shrink-0" />
                <small className="text-center text-xs font-medium">Profile</small>
            </a>

            <a
                href="/anime"
                className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-white dark:text-gray-400"
            >
                <FaDragon className="w-6 h-6 shrink-0" />
                <small className="text-center text-xs font-medium">Anime</small>
            </a>

            <p
                className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-white dark:text-gray-400"
            >
                <GiBookmark className="w-6 h-6 shrink-0"/>
                <small className="text-center text-xs font-medium">Manga (soon)</small>
            </p>

            {isAdmin && (
                <a
                    href='/adminPage'
                    className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-white dark:text-gray-400"
                >
                    <GiCastle className="w-6 h-6 shrink-0" />
                    <small className="text-center text-xs font-medium">Admin</small>
                </a>
            )}

            <a
                href="/"
                className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-white dark:text-gray-400"
            >
                <GiDungeonGate className="w-6 h-6" />
                <small className="text-center text-xs font-medium">Home</small>
            </a>
        </nav>
    );
};

export default SideBar;
