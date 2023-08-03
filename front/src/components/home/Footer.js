import React from 'react';
import {FaEnvelope, FaGithub, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
    const email = 'chuprynaforwork@gmail.com';
    const githubLink = 'https://github.com/dreaminsinner';
    const linkedinLink = 'https://www.linkedin.com/in/dreamin-sinner/';

    return (
        <footer className="bg-black text-white py-5">
            <div className="w-full px-1">
                <div className="flex flex-wrap justify-between items-center border-t border-gray-600 pt-0">
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-0">
                        <h2 className="text-xl font-semibold mb-2">Chupryna Mykyta</h2>
                        <p className="text-sm">
                            Aspiring Full Stack Developer
                        </p>
                    </div>
                    <div className="w-full sm:w-1/3 lg:w-1/6 mb-0">
                        <br/>
                        <h3 className="text-lg font-semibold mb-1">Contact Me</h3>
                        <p className="text-sm">
                            <a href={`mailto:${email}`} className="flex items-center text-white">
                                <FaEnvelope className="mr-2"/>
                                {email}
                            </a>
                        </p>
                        <div className="flex mt-1">
                            <a href={githubLink} className="flex items-center text-white mr-4">
                                <FaGithub className="mr-2"/>
                                GitHub
                            </a>
                            <a href={linkedinLink} className="flex items-center text-white">
                                <FaLinkedin className="mr-2"/>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-1 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Chupryna Mykyta. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
