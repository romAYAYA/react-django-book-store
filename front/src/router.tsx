import { createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import BookDetail from './pages/BookDetail.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/book/:id',
    element: <BookDetail/>
  }
])

export default router