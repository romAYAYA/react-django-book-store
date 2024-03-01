import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { Grid, Pagination, Stack } from '@mui/material'
import Box from '@mui/material/Box'

import BookCard from './BookCard.tsx'

import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { getBooks } from '../../store/actions/BookActions.ts'

const BooksGrid = () => {
  const dispatch = useAppDispatch()
  const { books, booksTotal, isLoading, error } = useAppSelector(state => state.bookReducer)
  const [page, setPage] = useState<number>(1)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getBooks(page))
  }, [dispatch, page])
  if (error) {
    console.log(error)
  }

  return (
    <>
      { isLoading ? (
        <Box sx={ { display: 'flex' } }>
          <CircularProgress/>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" flexDirection="column">
          <Grid container gap={ 2 } padding={ 5 } justifyContent="center">
            { books && books.map(book => (
              <BookCard book={ book } key={ book.id }/>
            )) }
          </Grid>
          <Stack spacing={ 2 }>
            <Pagination count={ Math.ceil(booksTotal / 20) } page={ page } onChange={ handlePageChange }/>
          </Stack>
        </Box>
      ) }
    </>
  )
}

export default BooksGrid