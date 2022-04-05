import { Box, Container, Typography  ,Grid, Paper} from '@mui/material'
import React from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'

function BookingPage() {

    const user = localStorage.getItem('userInfo')
    const userId = JSON.parse(user)
    const USERNAME = userId.name


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
                 Mclaren 520 D
                </Typography>
              </Box>
                </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h5' component='h5' >
                 {USERNAME}
                </Typography>
              </Box>
                </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h6' component='h5' >
                27/9/2022
                </Typography>
              </Box>
                </Paper>
            </Grid>
            <Grid item sm={12} xs={12} md={6} lg={3} xl={3} >
            <Paper elevation={3} sx={{minHeight:144}} >
            <Box sx={{justifyContent:'center',display:'flex',paddingTop:6}} >
                <Typography variant='h6' component='h5' >
                 20/08/2022
                </Typography>
              </Box>
                </Paper>
            </Grid>

            </Grid>
           </Box>
       </Container>

    </div>
  )
}

export default BookingPage