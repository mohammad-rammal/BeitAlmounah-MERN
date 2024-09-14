import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { workshops } from '../../data/workshops';

const Courses = () => {
    const [search, setSearch] = useState("");
    const [foods, setFoods] = useState(workshops);

    //   Filter Type: soap, jam,..
    const filterType = (category) => {
        setFoods(
            workshops.filter((item) => {
                return item.category === category;
            })
        );
    };

    return (
        <div className='max-w-[1640px] m-auto px-4 py-12'>
            <h1 className='text-orange-600 font-bold text-4xl text-center'
                style={{ color: '#233000' }}>
                Workshops Available
            </h1>


            <div className='flex flex-col lg:flex-row justify-between'>
                <div>

                    <div className="search flex items-center justify-center mt-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search Workshops"
                            className="border border-green-500 rounded-full py-2 px-4 outline-none"
                        />
                        {/* <button className="btn ml-2">Search</button> */}

                    </div>
                </div>
                {/* Fliter Type */}
                <div>
                    <p className='font-bold text-gray-700' style={{ color: '#233000' }}>Filter Type</p>
                    <div className='flex justfiy-between flex-wrap'>
                        <button
                            onClick={() => setFoods(workshops)}
                            style={{ color: '#233000' }}
                            className='m-1 hover:bg-green-600 hover:text-white'
                        >
                            All
                        </button>
                        <button
                            onClick={() => filterType('Mouneh')}
                            style={{ color: '#233000' }}
                            className='m-1  hover:bg-green-600 hover:text-white'
                        >
                            Mouneh
                        </button>
                        <button
                            onClick={() => filterType('Soups')}
                            style={{ color: '#233000' }}
                            className='m-1  hover:bg-green-600 hover:text-white'
                        >
                            Soups
                        </button>
                        <button
                            onClick={() => filterType('Sewing')}
                            style={{ color: '#233000' }}
                            className='m-1 hover:bg-green-600 hover:text-white'
                        >
                            Sewing
                        </button>

                        <button
                            onClick={() => filterType('Dairy')}
                            style={{ color: '#233000' }}
                            className='m-1 border-orange-600  hover:bg-orange-600 hover:text-white'
                        >
                            Dairy
                        </button>
                    </div>
                </div>


            </div>

            {/* Display workshops */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                {foods
                    .filter(a => a.name.toLowerCase().includes(search))
                    .map((item, index) => (
                        <Link to={`/workshops/${item.id}`} key={index} className="workshop-link">
                            <div className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='w-full h-[200px] object-cover rounded-t-lg'
                                />
                                <div className='flex justify-between px-2 py-4'>
                                    <p className='font-bold' style={{ color: '#233000' }}>{item.name}</p>
                                    <p>
                                        <span className='text-white p-1 rounded-full'
                                            style={{ backgroundColor: '#233000' }}
                                        >
                                            {item.price}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Courses;
