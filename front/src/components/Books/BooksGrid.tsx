import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CircularProgress from '@mui/material/CircularProgress'
import { Grid, Pagination, Stack } from '@mui/material'
import Box from '@mui/material/Box'

import BookCard from './BookCard.tsx'

import { getBooks } from '../../api/books.ts'

const BooksGrid = () => {
  const [page, setPage] = useState<number>(1)

  const dispatch = useDispatch()
  const booksListStore = useSelector((state) => state.booksList)

  useEffect(() => {
    getBooks(page, dispatch)
  }, [page, dispatch])

  useEffect(() => {
    console.log(booksListStore)
  }, [booksListStore])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <>
      { booksListStore.load && (
        <Box sx={ { display: 'flex' } }>
          <CircularProgress/>
        </Box>
      ) }
      { !booksListStore.load && booksListStore.data && (
        <Box display="flex" alignItems='center' flexDirection="column">
          <Grid container gap={ 2 } padding={ 5 } justifyContent='center'>
            { booksListStore.data.serialized_books.map(book => (
              <BookCard book={ book } key={ book.id }/>
            )) }
          </Grid>
          <Stack spacing={ 2 } >
            <Pagination count={ Math.ceil(booksListStore.data.total_count / 20)  } page={ page } onChange={ handlePageChange }/>
          </Stack>
        </Box>
      ) }
    </>
  )
}

export default BooksGrid