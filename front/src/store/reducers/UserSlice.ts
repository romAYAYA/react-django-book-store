import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser } from '../actions/UserActions.ts'

interface UserState {
  isAuthorized: boolean
  username: string
  avatar: string
  email: string
  isLoading: boolean
  error: string

  accessToken: string
  refreshToken: string
}

const initialState: UserState = {
  isAuthorized: false,
  username: '',
  avatar: '',
  email: '',
  isLoading: false,
  error: '',

  accessToken: '',
  refreshToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = ''
        state.isAuthorized = true
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as { errorMessage: string }).errorMessage
      })
      // login
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = ''
        state.isAuthorized = true
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as { errorMessage: string }).errorMessage
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = ''
        state.isAuthorized = false
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as { errorMessage: string }).errorMessage
      })
  },
})

export default userSlice.reducer
