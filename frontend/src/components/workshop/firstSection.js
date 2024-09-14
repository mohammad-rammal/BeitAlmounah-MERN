import React from "react";
import { useState } from "react";

const HeroSection = () => {
    const [search, setSearch] = useState("");
    return (
        <section className="py-20 overflow-x-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row ">
                    <div className="lg:w-1/2 md:w-1/2 mx-auto text-center">
                        <div className="hero__content">
                            <h2 className="mb-4 hero__title font-semibold leading-tight text-2xl md:text-3xl lg:text-4xl">
                                <br />  <br/><br/>
                                Indulge in the sweet symphony
                                <br />
                                of our baking workshops,
                            </h2>

                            <p className="mb-5">
                                where flour,
                                sugar, and passion
                                <br />
                                come together to create delightful masterpieces.
                                <br />
                                Elevate your baking skills and savor the joy of creation
                            </p>
                        </div>
                       

                    </div>

                    <div className="lg:w-1/2 md:w-1/2 ">
                        <img
                            src="https://res.cloudinary.com/dwjqz8eyv/image/upload/v1706180932/photo_2024-01-25_13-08-05_pkig3q.jpg"
                            alt=""
                            className="w-full h-auto max-h-96 object-cover rounded-full"
                            style={{
                                background: 'linear-gradient(145deg, #c3c3c3, #e8e8e8)',
                                borderRadius: '20px',
                                boxShadow: '28px 28px 56px #ababab, -28px -28px 56px #ffffff',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
