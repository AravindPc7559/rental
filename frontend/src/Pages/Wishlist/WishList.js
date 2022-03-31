import { Button, Card, CardMedia, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@material-ui/core';


function WishList() {
  return (
    <div>
        <AppBarHeader/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Box marginLeft={10} >
            <Typography variant='h4' component='h6' >
                WhishList
            </Typography>
        </Box>

        <Box>
            <Container>
            <Grid container spacing={3} mt={3} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:'auto'}} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:188,objectFit:'contain'}}
        image="https://cars.usnews.com/pics/size/640x420/images/article/202012/128775/1_2021_bugatti_chiron_super_sport.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
                Bmw X5
        </Typography>
      </CardContent>
      <CardActions>
       <Button  variant='contained' >View Car</Button>
       <Button variant='contained' color='error' >Remove</Button>
      </CardActions>
    </Card>
     </Grid>

     <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:'auto'}} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:188,objectFit:'contain'}}
        image="https://cars.usnews.com/pics/size/640x420/images/article/202012/128775/1_2021_bugatti_chiron_super_sport.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
                Bmw X5
        </Typography>
      </CardContent>
      <CardActions>
       <Button  variant='contained' >View Car</Button>
       <Button variant='contained' color='error' >Remove</Button>
      </CardActions>
    </Card>
     </Grid>

     <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:'auto'}} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:188,objectFit:'contain'}}
        image="https://cars.usnews.com/pics/size/640x420/images/article/202012/128775/1_2021_bugatti_chiron_super_sport.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
                Bmw X5
        </Typography>
      </CardContent>
      <CardActions>
       <Button  variant='contained' >View Car</Button>
       <Button variant='contained' color='error' >Remove</Button>
      </CardActions>
    </Card>
     </Grid>

     <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:'auto'}} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:188,objectFit:'contain'}}
        image="https://cars.usnews.com/pics/size/640x420/images/article/202012/128775/1_2021_bugatti_chiron_super_sport.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
                Bmw X5
        </Typography>
      </CardContent>
      <CardActions>
       <Button  variant='contained' >View Car</Button>
       <Button variant='contained' color='error' >Remove</Button>
      </CardActions>
    </Card>
     </Grid>

     <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:'auto'}} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:188,objectFit:'contain'}}
        image="https://cars.usnews.com/pics/size/640x420/images/article/202012/128775/1_2021_bugatti_chiron_super_sport.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
                Bmw X5
        </Typography>
      </CardContent>
      <CardActions>
       <Button  variant='contained' >View Car</Button>
       <Button variant='contained' color='error' >Remove</Button>
      </CardActions>
    </Card>
     </Grid>

     <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:'auto'}} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:188,objectFit:'contain'}}
        image="https://cars.usnews.com/pics/size/640x420/images/article/202012/128775/1_2021_bugatti_chiron_super_sport.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
                Bmw X5
        </Typography>
      </CardContent>
      <CardActions>
       <Button  variant='contained' >View Car</Button>
       <Button variant='contained' color='error' >Remove</Button>
      </CardActions>
    </Card>
     </Grid>
            </Grid>
            </Container>
        </Box>
    </div>
  )
}

export default WishList