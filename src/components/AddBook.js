import React, { useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries'

function AddBook() {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [genre, setGenre] = React.useState('')
  const { loading, error, data } = useQuery(GET_AUTHORS)
  const [addBook, { loading: addingBook }] = useMutation(ADD_BOOK)

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        addBook({
          variables: {
            title,
            authorId: author,
            genre,
          },
          refetchQueries: [{ query: GET_BOOKS }],
        })
        setTitle('')
        setAuthor('')
        setGenre('')
      } catch (error) {
        console.log(error)
      }
    },
    [addBook, title, author, genre]
  )

  const displayAuthors = () => {
    if (loading) {
      return <option>Loading...</option>
    }
    if (error) {
      return <option>Error: {error.message}</option>
    }
    return data.authors.map((author) => {
      return (
        <option key={author._id} value={author._id}>
          {author.name}
        </option>
      )
    })
  }

  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Title:</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
          type='text'
          name='title'
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select
          onChange={(e) => {
            setAuthor(e.target.value)
          }}
          name='author'
          value={author}
        >
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <div className='field'>
        <label>Genre:</label>
        <select
          onChange={(e) => {
            setGenre(e.target.value)
          }}
          name='genre'
          value={genre}
        >
          <option>Select Genre</option>
          <option value='Fantasy'>Fantasy</option>
          <option value='Sci-Fi'>Sci-Fi</option>
          <option value='Romance'>Romance</option>
          <option value='Mystery'>Mystery</option>
          <option value='Thriller'>Thriller</option>
        </select>
      </div>
      <button type='submit'>{addingBook ? '...' : '+'}</button>
    </form>
  )
}

export default AddBook
