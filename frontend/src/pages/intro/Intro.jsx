import React, { useState, useEffect } from 'react';
import './intro.css';

function Intro() {
    const [showContent, setShowContent] = useState(false);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            window.location.href = 'http://localhost:3000/';
        }, 500); // Delay for transition
    };

    return (
        <div className='full'>
            <video className='video' muted autoPlay loop>
                <source src='https://res.cloudinary.com/dftxzx2zc/video/upload/v1708006428/djjtdyvqsuiru2vzc6iu.mp4' type='video/mp4' />
            </video> 
            <h1 className={showContent ? 'wel show' : 'wel'}>Welcome To Beit Almonah</h1>
            <button className={showContent ? (clicked ? 'enter clicked' : 'enter show') : 'enter'} onClick={handleClick}> Click to Enter </button>
        </div>
    );
}

export default Intro;
