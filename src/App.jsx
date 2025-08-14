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
import { CartProvider } from './contexts/CartContext'
import ContactPage from './components/ContactPage/ContactPage'
import InfoPage from './components/InformationPage/InfoPage'
import ScrollToTop from './components/ScrollToTop'
import { OrderSummaryProvider } from './contexts/OrderSummaryContext'

function App() {

  return (
    <SnackbarProvider>
      <CartProvider>
        <AuthProvider>
          <OrderSummaryProvider>
            <Router>
              <div className='flex flex-col min-h-screen'>
                <Navigation />

                <ScrollToTop />

                <div className='flex-grow pt-24'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/meniuri' element={<MenuPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/informatii' element={<InfoPage />} />
                  </Routes>
                </div>

                <Footer />
              </div>
            </Router>
          </OrderSummaryProvider>
        </AuthProvider>
      </CartProvider>
    </SnackbarProvider>
  )
}

export default App
