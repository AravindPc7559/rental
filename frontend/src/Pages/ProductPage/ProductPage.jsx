import Paper from '@mui/material/Paper';
import { Button, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import ProductReview from '../../Components/ProductReview/ProductReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer'
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function ProductPage(id) {
  const [value, setValue] = React.useState([null, null]);
  const [dummyAmount , setDummyAmount] = useState(0)
  const [carData , setCarData] = useState({})
  const [carId, setCarID] = useState()
  const id2 = useParams()

  const user = localStorage.getItem('userInfo')
  // console.log(carData);
  
  // console.log(id2.id);

  const idInfo  = id2.id

  // console.log(idInfo);

  //getting single product.

    const gettingData = () => {
      try {

          axios.post(`http://localhost:5000/api/user/GetSingleCar/${id2.id}`).then((responce)=>{
            // console.log(responce.data);
            setCarData(responce.data)
            setDummyAmount(responce.data.Price)
            setCarID(responce.data._id)
          })

      } catch (error) {
        console.log(error);
      }
    }
  

  

  function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
}



const count = getDifferenceInDays(value[0],value[1])

    // console.log(count);

    const totalAmount = dummyAmount*count
  
  const handleBookNow = () => {


  

  }



  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            marginTop:60
        }}
    />
);

useEffect(()=>{
  gettingData()


},[])



  return (
    <div>

      <div>
        <AppBarHeader/>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>

      <div>
        <Grid container >
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
          <Paper elevation={3} variant="outlined" >
          <CardMedia
        component="img"
        height="140"
        style={{height:'auto',objectFit:'contain'}}
        alt="Image Loaded Failed"
        // image={require(`../../assets/CarImg/${carId}.jpg`)}
        image='https://upload.wikimedia.org/wikipedia/commons/9/9d/2019_Lexus_NX_300h_Takumi_CVT_2.5.jpg'
      />

          {/* <img src={'../../assets/CarImg/'+{carId}.jpg} alt="" /> */}
          </Paper>  
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Paper elevation={0} sx={{margin:'auto',height:'auto',marginTop:13,background:'none'}} >
              <div style={{display:'flex',justifyContent:'center',paddingTop:10}} >
                <Typography variant='h6' component='p' >
                  Choose Your Booking Date
                </Typography>
              </div>
          <Paper elevation={0} style={{height:'auto',background:'none'}} >
            <Box sx={{justifyContent:'center',display:'flex' , paddingTop:10 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Trip-starts"
        endText="Trip-ends"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </Box>
    
    <ColoredLine color="black" />
    <div style={{justifyContent:'center',display:'flex'}} >
      <Typography variant='h3' component='h2' >
        {carData.Brand}  {carData.Model}
      </Typography>
    </div>
    <br/>
    <div style={{justifyContent:'center',display:'flex'}} >
      <Typography variant='h5' >
        Total : {count} Days
      </Typography>
    </div>
    <div style={{justifyContent:'center',display:'flex'}} >
      <Typography variant='h4' >
        Total Amount : {totalAmount}/-
      </Typography>
    </div>
    <div style={{justifyContent:'center',display:'flex',marginTop:20}} >
      {user ? 
      <Button variant='outlined'  onClick={handleBookNow}  >Book Now</Button>
      :
      <Typography  variant='p' component='h6' sx={{color:'red',border:'2px solid red',padding:1.5}} >
        Please Login To Book A Car! <SentimentDissatisfiedOutlinedIcon   />
      </Typography>
      }
      
    </div>
            </Paper>
           
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div style={{marginTop:30}} >
        <Container>
        <Grid container>
          <Grid item lg={3} xl={3} md={6} sm={12} xs={12} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
              <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                <Typography variant='h5' component='h5' >
                  Rent/Day
                </Typography>
              </Box>

              <Box  >
                <Typography variant='h1 ' component='h1' textAlign='center' >
                  {carData.Price}
                </Typography>
              </Box>

          </Paper>
          </Grid>
          <Grid item lg={3} xl={3} md={6} sm={12} xs={12} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
          <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                <Typography variant='h5' component='h5' >
                  Number of seats
                </Typography>
              </Box>

              <Box  >
                <Typography variant='h1 ' component='h1' textAlign='center' >
                  {carData.Seats}
                </Typography>
              </Box>
          </Paper>
          </Grid>
          <Grid item lg={3} xl={3} md={6} sm={12} xs={12} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
          <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                <Typography variant='h5' component='h5' >
                 Mileage
                </Typography>
              </Box>

              <Box  >
                <Typography variant='h1 ' component='h1' textAlign='center' >
                  {carData.Mileage}
                </Typography>
              </Box>
          </Paper>
          </Grid>
          <Grid item lg={3} xl={3} md={6} sm={12} xs={12} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
          <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                <Typography variant='h5' component='h5' >
                 Fuel Type
                </Typography>
              </Box>

              <Box  >
                <Typography variant='h1 ' component='h1' textAlign='center' >
                  {carData.FuelType}
                </Typography>
              </Box>
        </Paper>
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                  <Typography variant='h5' component='h5' >
                   PickUp Location
                  </Typography>
                </Box>
  
                <Box  >
                  <Typography variant='h1 ' component='h1' textAlign='center' >
                    {carData.Location} <LocationOnOutlinedIcon onClick={()=>alert("location")} style={{fontSize:40,cursor:'pointer'}}  />
                  </Typography>
                </Box>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                  <Typography variant='h5' component='h5' >
                   Vehicle Number
                  </Typography>
                </Box>
  
                <Box  >
                  <Typography variant='h1 ' component='h1' textAlign='center' >
                    {carData.RegNo}
                  </Typography>
                </Box>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} >
          <Paper elevation={3} sx={{height:150,margin:1}} >
            
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:3}} >
                  <Typography variant='h5' component='h5' >
                   Registered Date
                  </Typography>
                </Box>
  
                <Box  >
                  <Typography variant='h1 ' component='h1' textAlign='center' >
                    {carData.Register}
                  </Typography>
                </Box>
          </Paper>
          </Grid>
        </Grid>
        </Container>
        <Container sx={{marginTop:5}} >
          <Grid container >
              <Grid   xl={12} lg={12} md={12}  sm={12} xs={12} >
                <Paper elevation={3} >
                 <Box>
                 <Typography variant='h4' component='h4' textAlign='center' paddingTop={2} >
                      Description
                    </Typography>  
                 </Box>
                 <Typography variant='body2' sx={{margin:2}} >
                   {carData.Description}
                 </Typography>
                 <br/>
                </Paper>
              </Grid>
          </Grid>
        </Container>
      </div>

          <ProductReview id={idInfo} />
          <br/>
          <br/>
          <Footer/>
    </div>
  )
}

export default ProductPage