import './App.css'
import 'react-slideshow-image/dist/styles.css'
import Navigation from './components/Navigation'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import MenuPage from './components/MenusPage/MenuPage'
import { Alert, Snackbar } from '@mui/material'
import AuthProvider from './contexts/AuthContext'
import SnackbarProvider from './contexts/SnackbarContext'

function App() {

  return (
    <SnackbarProvider>
      <AuthProvider>
        <Router>
          <div className='pt-24'>
            <Navigation />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/meniuri' element={<MenuPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
