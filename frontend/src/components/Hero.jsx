import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const {navigate} = useContext(AppContext);
  return (
    <div className='flex my-16 flex-wrap md:flex-row items-center justify-between bg-gradient-to-b from-cyan-100/90 hero-container'>
        <div className="relative">
            <img className='w-72 sm:w-96 md:w-full max-w-sm md:max-w-md hero-girl' src={assets.hero_girl} alt="" />
            <div className="hidden md:block absolute top-20 -right-40">
                <img className='w-32 md:w-48 lg:w-56 xl:w-64 hero-book' src={assets.hero_book} alt="" />
            </div>
        </div>
        <div className='p-5'>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
                Discover Your Next <br />
                <span className="text-primary">Favorite Book</span>
            </h1>
            <div className='flex flex-col my-10 md:flex-row gap-5 md:gap-10'>
                <button onClick={() => {
                    navigate("/books");
                    window.scrollTo({top:0,behavior:"smooth"})
                }} className='bg-primary text-white rounded-full hover:opacity-90 transition-opacity cursor-pointer px-10 py-2' >Shop Now</button>
                <button onClick={() => {
                    navigate("/books");
                    window.scrollTo({top:0,behavior:"smooth"})
                }} className='bg-white text-primary border rounded-full hover:bg-gray-100 transition-bg cursor-pointer px-10 py-2' >Explore Now</button>
            </div>
            
        </div>
    </div>
  )
}

export default Hero