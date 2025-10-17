import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Category = () => {
  const {navigate,setSelectedCategory} = useContext(AppContext);
  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    navigate("/books");
  }
  return (
    <div className='my-16 category'>
        <h1 className='text-2xl md:text-5xl font-bold text-gray-800' >Shop By Category</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-6 gap-5
         my-10 items-center justify-center flex-wrap category-items'>
            {categories.map((category) => (
                <div 
                onClick={() => {
                  handleCategoryClick(category.name);
                  window.scrollTo({top:0,behavior:"smooth"});
                }}
                key={category._id} className='flex items-center flex-col border border-gray-300 rounded-lg
                transition-all hover:scale-105 p-3 cursor-pointer'>
                    <img src={category.image} alt="" />
                    <h4>{category.name}</h4>
                </div>
            ))}
        </div>
    </div>

  )
}

export default Category