import React, { useState } from 'react';
import { Media }  from "../../data/video"
import './video.css';

const Index = () => {
    const [file, setFile] = useState(null);
    const handleCheckboxChange = (index) => {
        const updatedMedia = [...Media];
        const selectedFile = updatedMedia[index];

        // Increment the viewer count 
        if (!selectedFile.watchedCheckbox) {
            selectedFile.viewer += 1;
        }

        selectedFile.watchedCheckbox = !selectedFile.watchedCheckbox;
        setFile(selectedFile);
    };
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="min-h-28 ">
                <div className="max-w-screen-lg mx-auto py-4  container1">
                    <h2 className="font-bold text-center text-6xl text-slate-700 font-display" style={{ color: '#233000' }}>
                        Workshop 1
                    </h2>
                    <p className="text-center mt-4 font-medium text-slate-500" style={{ color: '#233000' }}>Catgory: JAM</p>
                    <div className="flex flex-wrap gap-6 justify-center mt-20">
                        {/* Map over each element in the Media array and render a div for each element */}
                        {Media.map((file, index) => (
                            <div key={index} className="bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-6">
                                {/* Container for media items */}
                                <div className="media-container">
                                    <div className="media" key={index}
                                        onClick={() => setFile(file)}
                                    >
                                        <video
                                            src={file.url}
                                            muted
                                            preload="metadata"
                                            poster={file.thumbnail}
                                            onClick={() => setFile(file)}
                                            className="object-cover h-52 w-full cursor-pointer"
                                        /></div>
                                </div>
                                <div class="p-6">
                                    {/* <span class="block text-slate-400 font-semibold text-sm">9 Febraury 2024</span> */}
                                    <h3 class="mt-3 font-bold text-lg pb-4 border-b border-slate-300" style={{ color: '#233000' }}>
                                        <a>{file.title}</a>
                                    </h3>


                                    <div class="flex mt-4 gap-4 items-center">
                                        <span class="flex gap-1 items-center text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            {file.viewer}
                                        </span>

                                        <label className="flex gap-1 items-center text-sm">
                                            <input
                                                type="checkbox"
                                                checked={file.watchedCheckbox}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                            Watched
                                        </label>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Popup for selected video */}
                    {file && (
                        <div className="popup-media" onClick={() => setFile(null)}>
                            
                            <span>&times;</span>
                           
                            {file?.type === 'video' && <video src={file?.url} autoPlay controls className="w-full" />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};





















export default Index;
