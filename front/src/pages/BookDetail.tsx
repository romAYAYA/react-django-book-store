import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { getBook } from '../store/actions/BookActions'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import bookImage from '../assets/rptgtpxd-1396254731.avif'

const BookDetail = () => {
  const dispatch = useAppDispatch()
  const { book, isLoading, error } = useAppSelector(
    (state) => state.bookReducer,
  )
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      dispatch(getBook(parseInt(id)))
      console.log(book)
    }
  }, [dispatch])

  const onDownload = async () => {
    // TODO переделать
    const response = await fetch(`http://localhost:8000/${book?.book_file}`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', '')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      {book && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          marginTop={8}
          width="100%"
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 5,
              maxWidth: 900,
            }}
          >
            <Box>
              <Box
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;',
                  height: 300,
                }}
              >
                <img src={bookImage} />
              </Box>
              <Button
                sx={{ marginTop: '25px' }}
                onClick={onDownload}
                variant="contained"
                color="primary"
              >
                Download
              </Button>
            </Box>
            <Box>
              <Typography
                gutterBottom
                fontWeight="bold"
                variant="h4"
                component="div"
              >
                {book.title}
              </Typography>
              <Typography gutterBottom component="div">
                {book.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default BookDetail
