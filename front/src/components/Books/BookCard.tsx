import React from 'react'

import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'

import bookImage from '../../assets/rptgtpxd-1396254731.avif'
import { IBook } from '../../models/book.interface.ts'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

const BookCard: React.FC<{ book: IBook }> = ({ book: { title, description, id, book_file } }) => {
  const truncatedDescription = description.length > 150 ? `${ description.slice(0, 150) }...` : description

  const onDownload = async () => {
    const response = await fetch(`http://localhost:8000/${book_file}`)
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
    <Card sx={ { maxWidth: 345 } }>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={ bookImage }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { title }
        </Typography>
        <Typography variant="body2"
                    color="text.secondary">
          { truncatedDescription }
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Link to={ `/${ id }` }>Link</Link>
          <Button onClick={ onDownload } variant="contained" color="primary">
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BookCard