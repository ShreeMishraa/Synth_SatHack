import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ tranparent = false }) => {
    return (
        <nav className={`flex items-center justify-between p-6 ${tranparent ? 'bg-transparent' : 'bg-black/40'}`}>
            <div className="text-2xl font-bold">
                <span className="text-indigo-400">⚡</span> Team Synth
            </div>
            <div className="flex space-x-2 md:space-x-6">
            </div>
        </nav >
    );
};

export default Navbar;