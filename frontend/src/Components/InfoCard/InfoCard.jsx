import React from 'react'
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


function InfoCard() {
  return (
  <Container>
      <Grid container square  spacing={5} >
            <Grid item lg={4} md={6}  sm={12} >
                <Paper elevation={3} >
                    <img src="https://revvselfdrivecar.s3-us-west-2.amazonaws.com/staging_images/banner_sanitised_01-min.jpg" alt="" style={{height:'200px',width:'100%'}} />
                </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={12} >
                <Paper elevation={3} >
                    <img src="https://revvselfdrivecar.s3-us-west-2.amazonaws.com/staging_images/banner_sanitised_02-min.jpg" alt="" style={{height:'200px',width:'100%'}} />
                </Paper>
            </Grid>
            <Grid item lg={4} md={6}  sm={12}  >
                <Paper elevation={3}  >
                    <img src="https://revvselfdrivecar.s3-us-west-2.amazonaws.com/staging_images/banner_sanitised_03-min.jpg" alt="" style={{height:'200px',width:'100%'}} />
                </Paper>
            </Grid>
      </Grid>
  </Container>
  )
}

export default InfoCard