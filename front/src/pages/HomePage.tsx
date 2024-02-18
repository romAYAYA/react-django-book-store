import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import { Card, CardContent, CardMedia, Grid, Pagination, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import bookImage from '../assets/rptgtpxd-1396254731.avif'

interface Book {
  id: number
  title: string
  description: string
}

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getBooks = async (pageNumber: number) => {
    try {
      setIsLoading(true)
      const res = await axios.get(`http://127.0.0.1:8000/api/book/?page=${ pageNumber }`)
      const { serialized_books, total_count } = res.data
      setTotalPages(Math.ceil(total_count / 20))
      setIsLoading(false)
      setBooks(serialized_books)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBooks(page)
  }, [page])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <>
      { isLoading && (
        <Box sx={ { display: 'flex' } }>
          <CircularProgress/>
        </Box>
      ) }
      { !isLoading && (
        <Grid container gap={ 2 } padding={ 5  } justifyContent="center">
          { books.map(book => (
            <Card sx={ { maxWidth: 345 } } key={ book.id }>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={ bookImage }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  { book.title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  { book.description }
                </Typography>
              </CardContent>
            </Card>
          )) }
        </Grid>

      ) }
      <Stack spacing={ 2 }>
        <Pagination count={ totalPages } page={ page } onChange={ handlePageChange }/>
      </Stack>
    </>
  )
}

export default HomePage