import React, { useContext, useState } from 'react'
import { categories } from '../assets/assets'
import { AppContext } from './../context/AppContext';

const Search = () => {
  const {navigate,setSearchQuery} = useContext(AppContext);
  const [input,setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
    navigate("/books");
  }
  return (
    <div className='my-16 rounded-lg shadow-md bg-white h-[500px] flex flex-col items-center justify-center bg-gradient-to-b from-purple-200/80'>
        <form 
        onSubmit={handleSearch} 
        className='mx-w-4xl w-full mx-auto flex justify-center search'>
            <input type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
             placeholder='Search Book...'
            className='w-1/2 outline-none border border-gray-300 py-4 text-center' />
            <button className='py-4 px-12 bg-primary text-white hover:opacity-90 transition-opacity border rounded-r-full cursor-pointer'>Search</button>
        </form>
        <div className='flex flex-wrap gap-5 mt-8'>
          {categories.map((category,index) => (
            <div key={index} tabIndex={category._id} className='w-[116px] mx-auto flex items-center justify-center
            bg-gray border border-gray-300 rounded-md cursor-pointer' >
              <img src={category.image} alt="" />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Search