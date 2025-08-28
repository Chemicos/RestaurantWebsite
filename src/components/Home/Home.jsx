import React from 'react'
import MainSection from './MainSection'
import WhyChooseUs from './WhyChooseUs'
import MenuList from './MenuList'
import { useOrders } from '../MenusPage/hooks/useOrders'

export default function Home() {
  const {refreshOrders} = useOrders()
  
  return (
    <div>
      <MainSection />
      <WhyChooseUs />
      <MenuList refreshOrders={refreshOrders}/>
    </div>
  )
}
