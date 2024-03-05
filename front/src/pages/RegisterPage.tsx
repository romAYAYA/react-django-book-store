import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Typography } from '@mui/material'
import axios from 'axios'
import { IUserData } from '../models/user.interface.ts'

const RegisterPage = () => {
  const [formData, setFormData] = useState<IUserData>({
    username: '',
    email: '',
    password: '',
    avatar: null
  })
  const formDataToSend = new FormData()
  formDataToSend.append('username', formData.username)
  formDataToSend.append('email', formData.email)
  formDataToSend.append('password', formData.password)
  if (formData.avatar) {
    formDataToSend.append('avatar', formData.avatar)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Registration successful:', data)
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <Box sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '100%',
          width: '400px',
          margin: '0 auto',
          height: '100dvh',
          gap: '5px'
        } }>
          <Box sx={ {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px'
          } }>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={ { flexGrow: 1 } }
            >
              Register
            </Typography>

            <TextField
              variant="standard"
              label="Nickname"
              type="text"
              value={ formData.username }
              onChange={ (event) => {
                setFormData({ ...formData, username: event.target.value })
              } }
              required
            />
            <TextField
              type="email"
              variant="standard"
              label="Email"
              value={ formData.email }
              onChange={ (event) => {
                setFormData({ ...formData, email: event.target.value })
              } }
              required
            />
            <TextField
              type="password"
              variant="standard"
              label="Password"
              value={ formData.password }
              onChange={ (event) => {
                setFormData({ ...formData, password: event.target.value })
              } }
              required
            />
            <Button
              variant="contained"
              component="label"
            >
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                name="avatar"
                onChange={ (event) => {
                  const file = event.target.files && event.target.files[0]
                  setFormData({ ...formData, avatar: file })
                } }
                required
              />
            </Button>
            { formData.avatar && <p>Selected File: { formData.avatar.name }</p> }
            <Button type="submit">Register</Button>
          </Box>
        </Box>
      </form>
    </>
  )
}

export default RegisterPage