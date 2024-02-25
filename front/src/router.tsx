import { createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import BooksPage from './pages/BooksPage.tsx'
import BookDetail from './pages/BookDetail.tsx'
import RulesPage from './pages/RulesPage.tsx'
import BaseLayout from './components/_base/BaseLayout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout content={<HomePage />} />
  },
  {
    path: '/book',
    element: <BaseLayout content={<BooksPage />} />
  },
  {
    path: '/:id',
    element: <BaseLayout content={<BookDetail />} />
  },
  {
    path: '/rules',
    element: <BaseLayout content={<RulesPage />} />
  },
]);

export default router