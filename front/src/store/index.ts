import { combineReducers, configureStore } from '@reduxjs/toolkit'

import bookReducer from './reducers/BookSlice.ts'
import userReducer from './reducers/UserSlice.ts'

const rootReducer = combineReducers({
  bookReducer,
  userReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
