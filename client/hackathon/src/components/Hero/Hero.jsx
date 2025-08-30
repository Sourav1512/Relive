import React from 'react'
import hero from "../../assets/hero.avif"; // Assuming you have a hero image


// Hero Component
// This section serves as the introductory banner of the website.
// It highlights the main call-to-action with a heading, hero image, and action buttons.


const Hero = () => {
  return (
    <section >
      <div>
        <h1 className='text-7xl font-semiboldbold text-center mt-20'>Connect. Contribute. <br /> Change lives.</h1>
      </div>
      <div className=' hidden md:flex justify-center mt-10  mx-auto'>
        <img src={hero} alt="hero" className='rounded-2xl w-[1000px] h-[600px] bg-cover bg-center'/>
      </div>
      <div className='flex justify-center mt-25 md:mt-10 mx-auto gap-10'>
        <button className=" flex  items-center gap-3 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600 cursor-pointer">
          <span>Join Now</span>
        </button>

        <button className=" flex  items-center gap-3 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600 cursor-pointer">
          <span>Learn More</span>
        </button>
      </div>
    </section>
  )
}

export default Hero
