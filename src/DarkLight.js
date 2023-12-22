import React, { useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const DarkLight = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }
    return (
        <button
            onClick={toggleDarkMode}
            className='text-xl cursor-pointer'>
            {isDarkMode ? <CiLight /> : <MdDarkMode />}
        </button>
    )
}

export default DarkLight;