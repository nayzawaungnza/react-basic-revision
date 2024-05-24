import React from 'react'
import bookimage from '../../assets/surja-sen-das-raj.jpg'
import useFetch from '../../hooks/useFetch'
import { Link, useLocation } from 'react-router-dom';

export default function BookList() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let search = params.get('search');
    let {data: books, loading, error}=useFetch(`http://localhost:3001/books${search ? `?q=${search}` :''}`);
    if (error) {
        return <p>{error}</p>;
    }
  return (
    <>
    {loading && <p> Loading ...</p>}
    {!!books && <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
        {books.map((book) => (
          <div className='p-4 border border-1 space-y-2' key={book.id}>

            <img src={bookimage} alt="" />
            <div className='text-center space-y-2 mt-3'>
              <h1>{book.title}</h1>
              <p>{book.description}</p>
              {/* genres */}
              <div className='flex flex-wrap'>
                {book.categories && book.categories.map(genre => (
                  <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' key={genre}> {genre}</span>
                ))}
              </div>
              <div>
              <Link to={`books/${book.id}`} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium w-full block rounded-sm text-sm px-4 py-2 text-center me-2 mb-2">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </>
  )
}
