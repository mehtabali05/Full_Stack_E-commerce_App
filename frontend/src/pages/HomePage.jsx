import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import Search from '../components/Search'
import Category from '../components/Category'
import NewArrival from '../components/NewArrival'
// import NewsLetter from '../components/NewsLetter'
import { AppContext } from '../context/AppContext'
import useDocumentTitle from '../hooks/useDocumentTitle'

const HomePage = () => {
  useDocumentTitle("Home");
  const {setSearchQuery,setSelectedCategory} = useContext(AppContext);

  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
  },[]);
  return (
    <div>
      <Hero />
      <main>
        <h1 className="welcome-heading text-2xl md:text-5xl font-bold text-gray-800">Welcome to BookStore</h1>
        <Search />
        <Category />
        <NewArrival />
        {/* <NewsLetter /> */}
      </main>
    </div>
  )
}

export default HomePage