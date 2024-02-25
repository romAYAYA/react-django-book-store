import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ISerializedBooksResponse } from '../../models/book.interface.ts'

export const getBooks = createAsyncThunk(
  'book/page',
  async (page: number, thunkAPI) => {

    try {
      const response = await axios.get<ISerializedBooksResponse>(`http://127.0.0.1:8000/api/book/?page=${page}`)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue({ errorMessage: 'Something went wrong', error: err })
    }
  }
)