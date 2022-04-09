import React from 'react'
import './carousel.css'
import {Carousel} from 'react-bootstrap'
import {Button, InputAdornment, TextField} from '@mui/material'
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  input: {
    backgroundColor:'white',
    // borderRadius:'10px',
    border:0,
    width:50
    // height:60
  },
  btn1:{
    width:100
  },
});

const data = [
    {
        image:"https://images.pexels.com/photos/4065796/pexels-photo-4065796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        content:'Flexible pricing plans',
        para:"Choose ‘Unlimited kms’ or ‘with fuel’ plans"
    },
    {
        image:"https://wallpaperforu.com/wp-content/uploads/2020/07/car-wallpaper-20072612362837-2048x864.jpg",
        content:'Home Delivery And Return',
        para:"On-time doorstep service, at your preferred location and time"
    },
    {
        image:"https://images.pexels.com/photos/3349460/pexels-photo-3349460.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        content:'Well maintained cars',
        para:"Regular service & maintenance; Inspected before each trip"
    },
]



function CarouselComponent() {
  const classes = useStyles();
  return (
        <div className="carousel">
        <Carousel fade>
  {
      data.map((obj)=>{
          return(
            <Carousel.Item interval={1000} onPlay >
            <img
              className="d-block w-100"
              src={obj.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{obj.content}</h3>
              <p>{obj.para}</p>
            </Carousel.Caption>
          </Carousel.Item>
          )
      })
  }
  
</Carousel>

      



        </div>

        
  )
}

export default CarouselComponent