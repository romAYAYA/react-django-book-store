import React, { useState } from 'react'
import axios from 'axios'
// TODO переделать тут вообще все
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setFormData(prevData => ({
      ...prevData,
      avatar: file
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('username', formData.username)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)
      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar)
      }

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
        <input
          type="text"
          name="username"
          value={ formData.username }
          onChange={ handleChange }
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={ formData.email }
          onChange={ handleChange }
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={ formData.password }
          onChange={ handleChange }
          placeholder="Password"
          required
        />
        <input
          type="file"
          accept="image/*"
          name="avatar"
          onChange={ handleAvatarChange }
          required
        />
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default RegisterPage