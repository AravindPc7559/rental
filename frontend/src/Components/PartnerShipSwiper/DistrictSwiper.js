import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Container from '@mui/material/Container';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";

import { Parallax, Pagination, Navigation } from "swiper";


function DistrictSwiper() {
  return (
    <Container>
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        style={{
          "background-image":
            "url(https://wallpapercave.com/wp/tDYC1tp.jpg)",
        }}
        data-swiper-parallax="-23%"
      ></div>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
         BMW
        </div>
        <div className="subtitle" data-swiper-parallax="-200">
          PartnerShip With Bmw
        </div>
        <div className="text" data-swiper-parallax="-100">
          <p>
          With the components and products from BMW M Performance Parts, the motorsport DNA from BMW is clearly felt, even off the racetrack. Developed with motorsport expertise, perfectly tailored to the respective model, and combinable to meet individual requirements – that is the range from BMW M Performance Parts. The retrofit components for the drive train, chassis, aerodynamics and cockpit significantly improve driving dynamics and underline the sporty tone of both the exterior appearance and the interior ambience of the car in question
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
         Mercedes Benz
        </div>
        <div className="subtitle" data-swiper-parallax="-200">
          Partnership With Mercedes Benz
        </div>
        <div className="text" data-swiper-parallax="-100">
          <p>
          Mercedes gave up the partnership with Us in favor of Geely, the main objective being cooperation for a new generation of 4-cylinder engines to be used in the future by Mercedes, and also we have the whole collection of Mercedes Benz.We’re excited to use our collective resources to develop and demonstrate how technology can improve the livability, vitality and sustainability of Long Beach.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Porsche
        </div>
        <div className="subtitle" data-swiper-parallax="-200">
          Partnership With Porsche
        </div>
        <div className="text" data-swiper-parallax="-100">
          <p>
          Porsche and the Our Company have joined forces in a strategic brand partnership. Within the framework of the holistic and long-term alliance, the premium manufacturers intend to jointly approach both sports competitions and the development of products.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </Container>
  )
}

export default DistrictSwiper