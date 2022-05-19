import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BOOK } from '../queries/queries'

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  })

  if (bookId) {
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error - {error.message} :(</p>
  }

  if (data?.book) {
    return (
      <div id='book-details'>
        <h2>Book Details</h2>
        <p>Title: {data?.book?.title}</p>
        <p>Genre: {data?.book?.genre}</p>
        <p>Author: {data?.book?.author?.name}</p>
        <div>
          <p>
            More books by <b>{data?.book?.author?.name}</b>
          </p>
          <ul className='other-books'>
            {data?.book?.author?.books.map((book) => (
              <li key={book._id}>{book.title}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  } else {
    return <p>No book selected</p>
  }
}

export default BookDetails
