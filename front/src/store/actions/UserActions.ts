import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../services/api.ts'
import { IUserData } from '../../models/user.interface.ts'

export const registerUser = createAsyncThunk(
  'register/user',
  async (payload: IUserData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/register', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ errorMessage: 'Something went wrong', error: err })
    }
  }
)