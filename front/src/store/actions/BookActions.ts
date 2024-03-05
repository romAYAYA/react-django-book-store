import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../services/api.ts'
import { ISerializedBooksResponse } from '../../models/book.interface.ts'

export const getBooks = createAsyncThunk(
  'books/get',
  async (page: number, thunkAPI) => {
    try {
      const response = await axiosInstance.get<ISerializedBooksResponse>(`/book/?page=${page}`)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ errorMessage: 'Something went wrong', error: err })
    }
  }
)