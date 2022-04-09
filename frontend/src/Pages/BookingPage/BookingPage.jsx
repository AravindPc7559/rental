import { Box, Container, Typography  ,Grid, Paper, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'
import { useSelector } from 'react-redux'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate ,useParams} from 'react-router-dom'
import Coupon from '../../Components/Coupon/Coupon';
import axios from 'axios';


 const  RAZKEYID = 'rzp_test_Ajy1fAmnCU0iHJ'
const RAZSECRETKEY = 'W3av1yexpQ421vNuaH1MQH9W'


function loadScript(src){
  return new Promise((resolve)=>{
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true)
    };
    script.onerror = () => {
      resolve(false)
    };
    document.body.appendChild(script);
  })
}

function BookingPage(id) {
  const navigate = useNavigate()
const [pay , SetPay] = useState(false)
const [map , setMap] = useState(false)
const id2 = useParams()


const IDinfo = id2.id
// console.log(IDinfo);

    const user = localStorage.getItem('userInfo')
    const userId = JSON.parse(user)
    const USERNAME = userId.name
    const USERID =  userId._id
    const USEREMAIL = userId.email

   

  const start = useSelector((state)=>state.date)
  const end = useSelector((state)=>state.endDate)
  const cardata = useSelector((state)=>state.car)
  const totalAmount = useSelector((state)=>state.Total)
  const discountAmount = useSelector((state)=>state.Discount)
  const disAllData = useSelector((state)=>state.DisAll)

  // console.log(discountAmount);
 
  console.log(disAllData._id);

  const couponId = disAllData._id
  const couponCode = disAllData.CouponCode
  const carName = cardata.brand

  // console.log(couponId , couponCode ) ;

  const disAmount = totalAmount-discountAmount

  const amount = discountAmount ? disAmount : totalAmount

console.log(amount);

// razorpay


async function showRazorpay() {
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );
  if(!res){
    alert("Razorpay SDK failed to load . Are you online?");
    return
  }

  const data = await axios.post('http://localhost:5000/api/user/razorpay')

  console.log(data);

  // const amount = data.amount

  // console.log(amount);

  const options = {
    key:RAZKEYID,
    currency: data.currency,
    amount: amount*100,
    order_id: data.id,
    name: "RoadSter Car Booking",
    description: "Your Car has been booked",
    handler:function (responce){

      axios.post(`http://localhost:5000/api/user/razorpaysuccess/${id2.id}`,{
        couponId,couponCode,start,end,USERNAME,USERID,carName,amount
      }).then((res)=>{
        console.log(res.data.message);
        navigate('/bookingsuccess')
      })

      // alert("transaction successfull")

    },
    prefill:{
      name:USERNAME,
      email:USEREMAIL,
      phone_number:"7559017884"
    }
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

}



// 








  useEffect(()=>{
    if(!user){
      navigate('/')
    }
    // console.log("mounted");


    return ()=>{
      // if(totalAmount === 0){
      //   navigate('/')
      // }
      // console.log("unmounted");
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
             TOTAL AMOUNT : {{discountAmount} ? disAmount : {totalAmount}}/-
              </Typography>
          </Box>
          <Box sx={{justifyContent:'end',display:'flex',paddingTop:2}} >
            <Button variant='outlined' color='success' onClick={showRazorpay}   >Pay With Razorpay</Button>
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