import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function AdminDashboard() {
  return (
    <div>
      <SideBar/>
      <Box sx={{ flexGrow: 1 ,paddingLeft:50 ,marginTop:10 }}>
      <Grid container spacing={4} >  
          <Grid sm={12} xs={12} md={6} lg={4} xl={4} >
          <Paper elevation={12} style={{width:400,height:150}} >
            hai1
          </Paper>

          </Grid>

          <Grid  sm={12} xs={12} md={6} lg={4} xl={4}>
          <Paper elevation={12}  style={{width:400,height:150}} >
            hai2
          </Paper>

            </Grid>

            <Grid sm={12} xs={12} md={6} lg={4} xl={4}>
            <Paper elevation={12} style={{width:400,height:150}} >
              hai
            </Paper>

            </Grid>
      </Grid>
      </Box>
    </div>
  )
}

export default AdminDashboard