import { Button, Card, CardMedia, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect,useState } from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@material-ui/core';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function WishList() {
  const user = localStorage.getItem('userInfo') 
  const [carID , setCarId] = useState([])
  const [render,setRender] = useState(0)
  const navigate = useNavigate()
  
  
  const data = JSON.parse(user)
  const USERID = data._id
  console.log(carID);


  const getallwishlistdata  = () => {
     axios.post('http://localhost:5000/api/user/getallwishlistdata',{USERID}).then((res)=>{
      // console.log(res);
      setCarId(res.data)
    })
  }

  const removefromwishlist = (_id) => {
    try {
      axios.post(`http://localhost:5000/api/user/removefromwishlist/${_id}`,{USERID}).then((res)=>{
        // console.log(res);
      })
      setRender(render+1)
    } catch (error) {
      
    }
  }
console.log(render);

  
  useEffect(()=>{
      getallwishlistdata()  
  },[render])

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
            <Grid container spacing={4} mt={3} >
              {carID.map((data)=>{

                return(
            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}  >
                  <Card sx={{ maxWidth: 345 }}  style={{height:'auto',width:280}}  >
                  <CardMedia
                             component="img"
                                height="140"
      
                        style={{height:188,objectFit:'contain'}}
                        image={data.imgUrl}
                        alt=""
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                               {data.brand} {data.model}
                        </Typography>
                      </CardContent>
                      <CardActions style={{justifyContent:'center'}} >
                      <Button  variant='contained' onClick={()=>navigate(`/productpage/${data._id}`)}  >View Car</Button>
                      <Button variant='contained' color='error' onClick={()=>removefromwishlist(`${data._id}`)} >Remove</Button>
                      </CardActions>
                      <br/>
                      </Card>
                     
     </Grid>
                )
              })}
          
            </Grid>
            </Container>
        </Box>
    </div>
  )
}

export default WishList