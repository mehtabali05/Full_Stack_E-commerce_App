import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'


const BookCard = ({book}) => {
    const {addToCart} = useContext(AppContext);
  return (
    <article
      className="p-4 book-card"
      aria-labelledby={`book-${book._id}-title`}
      aria-describedby={`book-${book._id}-author`}
    >
        <Link to={`/book/${book._id}`} >
            <img src={`${book.image}`}
            className='w-[255px] h-[350px] transition-all duration-300 hover:scale-105 md:object-fit book-image' 
            alt={`Cover of ${book.title} by ${book.author}`} />
        </Link>
        <div className='flex items-center justify-between my-3 pr-12 md:pr-0 reviews'>
            <div className='flex items-center gap-2 my-3'>
                <img src={assets.star_icon} alt="Star rating" className="w-4 h-4" />
                <p>{book.rating}</p>
            </div>
            <div className='flex items-center gap-2 my-3'>
                <p>{book.reviews}</p>
                <p>Reviews</p>
            </div>
        </div>
            <p id={`book-${book._id}-author`} className="text-sm text-gray-600">
                {book.author}
            </p>
            <h3 className="font-semibold text-lg" id={`book-${book._id}-title`}>{book.title}</h3>
            <div className='flex items-center gap-5'>
                <p className='line-through text-gray-400'>{book.price}</p>
                <p className='text-gray-800'>{book.offerPrice}</p>
            </div>
            <button
              onClick={() => addToCart(book)}
              className="bg-primary text-white rounded-full py-2 px-10 md:px-5 mt-4 cursor-pointer hover:bg-primary/90 transition-colors"
              aria-label={`Add ${book.title} to cart`}
      >Add to Cart</button>
    </article> 
  )
}

export default BookCard