import React from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'

import bookImage from '../../assets/rptgtpxd-1396254731.avif'
import { IBook } from '../../interfaces/book.interface.ts'
import { Link } from 'react-router-dom'

const BookCard: React.FC<{ book: IBook }> = ({ book: { title, description, id } }) => {
  const truncatedDescription = description.length > 150 ? `${description.slice(0, 150)}...` : description

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
        <Link to={`book/${id}`}>Link</Link>
      </CardContent>
    </Card>
  )
}

export default BookCard