import axios from 'axios'
import { Dispatch } from 'react'
import { UnknownAction } from '@reduxjs/toolkit'
import {booksList} from '../store/constants.ts'

export async function getBooks(bookPage: number, dispatch: Dispatch<UnknownAction> ) {
  try {
    dispatch({ type: booksList.load })
    const response = await axios.get(`http://127.0.0.1:8000/api/book/?page=${ bookPage }`)
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: booksList.success, payload: response.data })
    } else {
      dispatch({ type: booksList.error, payload: response.data })
    }
  } catch (error: any) {
    dispatch({ type: booksList.fail, fail: error.toString() })
  }
}