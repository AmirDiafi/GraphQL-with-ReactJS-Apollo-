import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries/queries'
import BookDetails from './BookDetails'

function BookList() {
  const [bookId, setBookId] = useState(null)
  const { loading, error, data } = useQuery(GET_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error - {error.message} :(</p>

  return (
    <div>
      <ul id='book-list'>
        {data?.books?.map((book, index) => (
          <li
            onClick={() => {
              setBookId(book._id)
            }}
            key={index}
          >
            {book.title}
          </li>
        ))}
      </ul>
      <hr />
      <BookDetails bookId={bookId} />
    </div>
  )
}

export default BookList
