import React, { useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Typography } from '@mui/material';

function AdminDashboard() {
  const [totalUser , setTotalUser] = useState([])
  const [totalCar , setTotalCar] = useState([])
  const [revenuTotal , setTotalRevenu] = useState([])

// console.log(revenuTotal);
  const UserLenght = totalUser.length
  const totalcarlength = totalCar.length


  // console.log(totalcarlength);
  // console.log(UserLenght);

    const totalUserData = () => {
      try {
        axios.get('/api/admin/userManagement').then((res)=>{
          // console.log(res.data);
          setTotalUser(res.data)
        })
      } catch (error) {
        
      }
    }

    const carData = () => {
      try {
        axios.get('/api/user/getCarData').then((res)=>{
          // console.log(res);
          setTotalCar(res.data.data)
        })
      } catch (error) {
        
      }
    }

    const revenu = () => {
      try {
        axios.get('/api/admin/revenu').then((res)=>{
          // console.log(res);
          setTotalRevenu(res.data.revenu[0].sum)
        })
        
      } catch (error) {
        
      }
    }


   

    useEffect(()=>{
      totalUserData()
      carData()
      revenu()
    },[])

  return (
    <div>
      <SideBar/>
      <Box sx={{ flexGrow: 1 ,paddingLeft:50 ,marginTop:10 }}>
      <Grid container spacing={4} >  
          <Grid sm={12} xs={12} md={6} lg={4} xl={4} >
          <Paper elevation={12} style={{width:400,height:150}} >
          <Typography variant='h4' component='h6' textAlign='center' paddingTop={7} fontFamily='monospace' >Revenu:{revenuTotal}/-</Typography>
          </Paper>

          </Grid>

          <Grid  sm={12} xs={12} md={6} lg={4} xl={4}>
          <Paper elevation={12}  style={{width:400,height:150}} >
            <Typography variant='h4' component='h6' textAlign='center' paddingTop={7} fontFamily='monospace' >Total {UserLenght} Users</Typography>
          </Paper>

            </Grid>

            <Grid sm={12} xs={12} md={6} lg={4} xl={4}>
            <Paper elevation={12} style={{width:400,height:150}} >
            <Typography variant='h4' component='h6' textAlign='center' paddingTop={7} fontFamily='monospace' >Total {totalcarlength} Cars</Typography>
            </Paper>

            </Grid>
      </Grid>
      </Box>
    </div>
  )
}

export default AdminDashboard