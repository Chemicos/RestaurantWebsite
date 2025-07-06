import './App.css'
import 'react-slideshow-image/dist/styles.css'
import Navigation from './components/Navigation'
import MainSection from './components/header/MainSection'
import WhyChooseUs from './components/WhyChooseUs'
import MenuList from './components/FeaturedMenus/MenuList'
import Footer from './components/footer/Footer'

function App() {

  return (
    <div className='pt-24'>
      <Navigation />
      <MainSection />
      <WhyChooseUs />
      <MenuList />
      <Footer />
    </div>
  )
}

export default App
