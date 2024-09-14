import React from 'react'
import Recipes from '../components/Recipes/Recipes'

const Home = () => {
  return (
    <main className='w-full flex flex-col'>

      <section id="recipes" className='md:max-w-[1440px] mx-auto px-4 md:px-20'>
        <Recipes />
      </section>
    </main>
  )
}

export default Home