import { configureStore } from '@reduxjs/toolkit'
import { constructorReducers } from './constructors/reducers.ts'
import * as constants from './constants.ts'

const store = configureStore({
  reducer: {
    booksList: constructorReducers(constants.booksList)
  }
})

export default store