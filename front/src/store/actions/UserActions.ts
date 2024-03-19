import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import axiosInstance from '../../services/api.ts'
import { IUserData } from '../../models/user.interface.ts'

interface ILoginData {
  username: string
  password: string
}

export const registerUser = createAsyncThunk(
  'register/user',
  async (payload: IUserData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/register', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')

      Cookies.set('access_token', response.data.access_token, { path: '/' })
      Cookies.set('refresh_token', response.data.refresh_token, { path: '/' })

      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errorMessage: 'Something went wrong',
        error: err,
      })
    }
  },
)

export const loginUser = createAsyncThunk(
  'login/user',
  async (payload: ILoginData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/login', payload)
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      
      Cookies.set('access_token', response.data.access_token, { path: '/' })
      Cookies.set('refresh_token', response.data.refresh_token, { path: '/' })
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errorMessage: 'Something went wrong',
        error: err,
      })
    }
  },
)

export const logoutUser = createAsyncThunk(
  'logout/user',
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post('/logout')
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
    } catch (err) {
      return thunkAPI.rejectWithValue({
        errorMessage: 'Something went wrong',
        error: err,
      })
    }
  },
)
