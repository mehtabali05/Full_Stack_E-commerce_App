import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import BookCard from './BookCard';

const NewArrival = () => {
    const {booksData} = useContext(AppContext);
  return (
    <div className='my-16'>
        <h1 className='text-2xl md:text-5xl font-bold text-gray-800' >New Arrival</h1>
        <div className='new-arrival my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex flex-wrap justify-center items-center'>
            {booksData.slice(0,8).map((book) =>(
                <BookCard key={book._id} book = {book} />
            ))}
        </div>
    </div>

  )
}

export default NewArrival