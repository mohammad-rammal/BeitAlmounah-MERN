import React, { useState, useEffect } from 'react';
import "./headerTop.css"



function HeaderAdmin() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString();

    return (
        <>
            <div className='navbar ds'>


                <p className='dateTimeParagraph'>{formattedDateTime}</p>

            </div>

            <div className='datatime'>
                <p className='dateTimeParagraph'>{formattedDateTime}</p>
            </div>
            </>
    );
}

export default HeaderAdmin;
