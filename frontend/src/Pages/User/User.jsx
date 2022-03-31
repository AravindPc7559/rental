import React, { useState } from 'react'
import CarouselComponent from '../../Components/Carousel/CarouselComponent'
import DistrictSwiper from '../../Components/PartnerShipSwiper/DistrictSwiper'
import Footer from '../../Components/Footer/Footer'
import InfoCard from '../../Components/InfoCard/InfoCard'
import AppBarHeader from '../../Components/AppBar/AppBar'
import Cards from '../../Components/Cards/Cards'
import Accordian from '../../Components/Accordian/Accordian'




function User() {
  const [user,setUser] = useState(true)
  return (
    <div>
  
      <AppBarHeader/>
      <CarouselComponent/>
      <br/>
      <InfoCard/>
      <br/>
      <DistrictSwiper/>
      <br/>
      <Cards/>
      <br/>
      <Accordian/>
      <br/>
      <Footer/>
    </div>
  )
}

export default User