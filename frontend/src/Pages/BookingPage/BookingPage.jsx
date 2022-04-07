import { Box, Container, Typography  ,Grid, Paper, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'
import { useSelector } from 'react-redux'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate} from 'react-router-dom'
import Coupon from '../../Components/Coupon/Coupon';

function BookingPage() {
  const navigate = useNavigate()
const [pay , SetPay] = useState(false)
const [map , setMap] = useState(false)

    const user = localStorage.getItem('userInfo')
    const userId = JSON.parse(user)
    const USERNAME = userId.name


   

  const start = useSelector((state)=>state.date)
  const end = useSelector((state)=>state.endDate)
  const cardata = useSelector((state)=>state.car)
  const totalAmount = useSelector((state)=>state.Total)
  const discountAmount = useSelector((state)=>state.Discount)

  // console.log(discountAmount);

  const discoutAmount = totalAmount-discountAmount

  useEffect(()=>{
    if(!user){
      navigate('/')
    }
    console.log("mounted");


    return ()=>{
      // if(totalAmount === 0){
      //   navigate('/')
      // }
      console.log("unmounted");
    }

  },[])

    const mapHandle = () => {

      setMap(true)

    }
  
  return (
    <div>
        <AppBarHeader/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
       <Container>
           <Typography variant='h4' component='h6' fontFamily='Helvetica Neue' >Booking Details</Typography>
           <Box mt={2} height={160}  >
            <Grid container spacing={2} >
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h5' component='h5' >
                 Car: {cardata.brand}
                </Typography>
              </Box>
                </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h5' component='h5' >
                 Customer: {USERNAME}
                </Typography>
              </Box>
                </Paper>
            </Grid>
            
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h6' component='h5' >
              Trip Start: {start}
                </Typography>
              </Box>
                </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h6' component='h5' >
              Trip End: {end}
                </Typography>
              </Box>
                </Paper>
            </Grid>


            <Grid item sm={12} xs={12} md={6} lg={6} xl={6} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h6 ' component='h5' textAlign='center' >
                Pickup Location:  {cardata.location} <LocationOnOutlinedIcon onClick={mapHandle} style={{fontSize:40,cursor:'pointer'}}  />
                  </Typography>
              </Box>
                </Paper>
            </Grid>

            <Grid item sm={12} xs={12} md={6} lg={6} xl={6} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h6' component='h5' >
              Our HelpLine: +91 7559017884
                </Typography>
              </Box>
                </Paper>
            </Grid>

            <Grid item sm={12} xs={12} md={12} lg={12} xl={12} >
          <Box sx={{justifyContent:'end',display:'flex',paddingTop:2}} >
          <Typography variant='h5' component='h5'  >
             TOTAL AMOUNT : {{discountAmount} ? discoutAmount : {totalAmount}}/-
              </Typography>
          </Box>
          <Box sx={{justifyContent:'end',display:'flex',paddingTop:2}} >
            <Button variant='outlined' color='success'   >Pay Now</Button>
            <Button variant='outlined' color='success' sx={{marginLeft:2}}  onClick={()=>SetPay(true)}  >Coupon</Button>
          </Box>
        </Grid>

      {
        pay ?
        <Coupon pay={pay} SetPay={SetPay} />
        :
        null
      }

     

            </Grid>
           </Box>

          

       </Container>

       

    </div>
  )
}

export default BookingPage