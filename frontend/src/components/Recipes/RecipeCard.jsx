import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const { image, label, cuisineType, dietLabel, mealType, uri } = recipe?.recipe

    const id = uri?.split("#")[1]

    return (
        <Link to={`/recipes/${id}`} className='w-full md:w-[208px]'>
            <div className='bg-_gradient shadow w-full rounded-lg'>
                <img src={image} alt={label} className='rounded-lg h-[200px] md:h-[150px] w-full' />

                <div className='p-3'>
                    <p className='text-black font-semibold'>{label}</p>


                </div>
            </div>
        </Link>
    )
}

export default RecipeCard