import { gql } from '@apollo/client'

const GET_AUTHORS = gql`
  {
    authors(page: 1, limit: 10) {
      name
      age
      _id
    }
  }
`

const GET_BOOKS = gql`
  {
    books(page: 1, limit: 10) {
      title
      genre
      _id
    }
  }
`

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      title
      genre
      author {
        name
        age
        _id
        books {
          title
          genre
          _id
        }
      }
    }
  }
`

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $authorId: ID!, $genre: String!) {
    addBook(title: $title, authorId: $authorId, genre: $genre) {
      title
      _id
    }
  }
`

export { GET_AUTHORS, GET_BOOKS, ADD_BOOK, GET_BOOK }
