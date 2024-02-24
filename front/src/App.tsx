import { RouterProvider } from 'react-router-dom'

import Header from './components/_base/Header.tsx'
import Footer from './components/_base/Footer.tsx'

import router from './router.tsx'


const App = () => {

  return (
    <>
      <Header/>
      <RouterProvider router={router} />
      <Footer/>
    </>
  )
}

export default App
