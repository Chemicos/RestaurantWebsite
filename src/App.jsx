import './App.css'
import 'react-slideshow-image/dist/styles.css'
import Navigation from './components/Navigation'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import MenuPage from './components/MenusPage/MenuPage'
import ContactPage from './components/ContactPage/ContactPage'
import InfoPage from './components/InformationPage/InfoPage'
import ScrollToTop from './components/ScrollToTop'
import FinishOrderPage from './components/FinishOrder/FinishOrderPage'
import AppInitializer from './AppInitializer'
import AuthProvider from './contexts/AuthContext'
import SnackbarProvider from './contexts/SnackbarContext'
import { CartProvider } from './contexts/CartContext'
import { OrderSummaryProvider } from './contexts/OrderSummaryContext'
import { GlobalOrdersProvider } from './contexts/GlobalOrdersContext'
import { OrdersProvider } from './components/MenusPage/hooks/useOrders'

function App() {

  return (
    <SnackbarProvider>
      <AuthProvider>
        <CartProvider>
          <GlobalOrdersProvider>
            <OrdersProvider>
              <OrderSummaryProvider>
                <Router>
                  <div className='flex flex-col min-h-screen'>
                    <AppInitializer />

                    <Navigation />
                    <ScrollToTop />

                    <div className='flex-grow pt-24'>
                      <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/meniuri' element={<MenuPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                        <Route path='/informatii' element={<InfoPage />} />
                        <Route path='/finalizare' element={<FinishOrderPage />} />
                      </Routes>
                    </div>

                    <Footer />
                  </div>
                </Router>
              </OrderSummaryProvider>
            </OrdersProvider>
          </GlobalOrdersProvider>
        </CartProvider>
       </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
