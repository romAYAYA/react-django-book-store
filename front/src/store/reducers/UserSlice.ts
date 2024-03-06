import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerUser } from '../actions/UserActions.ts'

interface UserState {
  username: string
  avatar: string
  email: string
  isLoading: boolean
  error: string

  accessToken: string
  refreshToken: string
}

const initialState: UserState = {
  username: '',
  avatar: '',
  email: '',
  isLoading: false,
  error: '',

  accessToken: '',
  refreshToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{
        accessToken: string,
        refreshToken: string
      }>) => {
        state.isLoading = false
        state.error = ''
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as { errorMessage: string }).errorMessage
      })
  }
})

export default userSlice.reducer