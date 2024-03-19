import { IBook } from '../../models/book.interface.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBooks, getBook } from '../actions/BookActions.ts'

interface BookState {
  book: IBook | null
  books: IBook[]
  booksTotal: number
  isLoading: boolean
  error: string
}

const initialState: BookState = {
  book: null,
  books: [],
  booksTotal: 0,
  isLoading: false,
  error: ''
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<{
        serialized_books: IBook[],
        total_count: number
      }>) => {
        state.isLoading = false
        state.error = ''
        state.books = action.payload.serialized_books
        state.booksTotal = action.payload.total_count
      })
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as { errorMessage: string }).errorMessage
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = ''
        state.book = action.payload
      })
      .addCase(getBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as { errorMessage: string }).errorMessage
      })
  }
})

export default bookSlice.reducer
