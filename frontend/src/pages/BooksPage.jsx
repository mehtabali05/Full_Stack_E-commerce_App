import React, { useContext } from 'react'
import BookCard from '../components/BookCard'
import { AppContext } from '../context/AppContext'

const BooksPage = () => {
  const {booksData,searchQuery,selectedCategory} = useContext(AppContext);
  
  const filteredBooks = booksData.filter((book) => {
    // console.log(book);
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    // console.log(matchesCategory)
    // console.log(matchesSearch);
    return matchesSearch && matchesCategory;
  })
  return (
    <div className='py-16'>
      <h1 className='text-2xl md:text-5xl font-bold text-gray-800' >All Books</h1>
      <div className='my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>
    </div>
  )
}

export default BooksPage