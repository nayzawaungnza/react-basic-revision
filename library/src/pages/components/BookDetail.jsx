import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import bookimage from '../../assets/surja-sen-das-raj.jpg'

export default function BookDetail() {
    let {id} = useParams();
  let { data: book, loading, error } = useFetch(`http://localhost:3001/books/${id}`);
  let navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);
  return (
    <>
    {!!loading && <p>Loading ...</p>}
      {!!book &&
      <div className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row">
      <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
        src={bookimage}
        alt="" />
        <div className=' flex flex-col justify-start p-6'>
                {book.categories && book.categories.map(genre => (
                  <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' key={genre}> {genre}</span>
                ))}
              </div>
      <div className="flex flex-col justify-start p-6">
        <h5 className="mb-2 text-xl font-medium">{book.title}</h5>
        <p className="mb-4 text-base">{book.description}</p>
        
      </div>
    </div>}
    </>
  )
}
