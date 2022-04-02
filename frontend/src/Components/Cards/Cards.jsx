import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Grid } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,TextField } from '@mui/material';
import './card.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import { Box } from '@mui/system';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };    

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    textAlign:'center',
    fontSize:30,
    fontFamily:'revert'
  }));

function Cards() {
    const [visible,setVisible] = useState(4)
    const [carsData,setCarsData] = useState([])
    const [render , Setrender] = useState(false)
    const [userId , setUserId] = useState('')
    const [searchText , setSearchText] = useState('')
    const [searchData , setSearchData] = useState([])
    const [lowtohighdata , setLowToHighData]= useState([])
    const [hightolowdata , setHighToLowData] = useState([])
   


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const userInfo  = localStorage.getItem('userInfo')
    const value = JSON.parse(userInfo)
    
  

    const Datas = () => {
      if(userInfo){
        setUserId(value._id)
      }
    }

    

    const showMoreItem = ()=>{
        setVisible((prevValue) => prevValue +4)
    }

    const showLessItem = () => {
        setVisible((prevValue) => prevValue -4)
    }

    const navigate = useNavigate()

    const GetCars = async() => {
        const data = await axios.get('http://localhost:5000/api/user/getcarData').then((res)=>{
            // console.log(res.data.data)

            setCarsData(res.data.data)
            Setrender(true)
        })


        // console.log(data);

    }
 

   useEffect(()=>{
         GetCars()
         Datas()
   },[render]);


   const wishlist = (id) => {
     console.log(id);
     console.log(userId); 

     axios.post(`http://localhost:5000/api/user/dataTowishlist/${id}`,{userId}).then((res)=>{
       console.log(res);
     })
   }



   const handleSearch = () => {
      // console.log(searchText);


     try {
      axios.post('http://localhost:5000/api/user/search',{searchText}).then((res)=>{
        // console.log(res.data.data);
        setSearchData(res.data.data)
      })
     } catch (error) {
        console.log("error occured while searching",error);
     }
   }


 
   const lowtohigh = () => {
     try {
        axios.get('http://localhost:5000/api/user/lowtohigh').then((res)=>{
          // console.log(res);
          setLowToHighData(res.data.sort)
        })
     } catch (error) {
        console.log("error occured while sorting",error);
     }
   }

   const hightolow = () => {
     try {
       axios.get('http://localhost:5000/api/user/hightolow').then((res)=>{
        //  console.log(res);
         setHighToLowData(res.data.sorttwo)
       })
     } catch (error) {
       
     }
   }
    
  
  //  console.log(hightolowdata);
  return (
    <div>
     
        <Div>{"Choose your car."}</Div>
        <br/>

        <Container>
        <Grid container spacing={4} >
                    <Grid item sm={12} xs={12} md={6} lg={4} xl={4} >
                           <Box marginLeft={2} >
                           <TextField id="outlined-basic" label="Search Cars"  onChange={(e)=>setSearchText(e.target.value)}   />
                            <Button variant='contained'  sx={{marginTop:1,marginLeft:1}} onClick={handleSearch} >Search</Button>
                           </Box>
                    </Grid>

                      
                    <Grid item sm={12} xs={12} md={6} lg={4} xl={4} >
                      <Box sx={{marginTop:1 , border:'1px solid black'  ,maxWidth:400}} >
                      <Button aria-describedby={id} type="button" style={{marginLeft:140}} onClick={handleClick}>
        Filter
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'white'}}>
          <Button onClick={lowtohigh} >Low to high</Button>
          <br/>
          <Button onClick={hightolow} >High to low</Button>
        </Box>
      </Popper>
      </Box>
                    </Grid>

                    <Grid sm={12} xs={12} md={6} lg={4} xl={4} >
                    <Box sx={{ minWidth: 120 }} marginTop={1.5}  >
                        
                     </Box>
                    </Grid>

                    </Grid>
        </Container>

        <br/>
        <Container maxWidth="xl">
          

            {
              searchData.length > 0 ?

              <Grid container >
              
              {
                  searchData.slice(0,visible).map((obj)=>{
                      return(
                       <Grid item xl={3}  lg={4} md={4} sm={6} xs={12} >
                       <Card sx={{ maxWidth: 345 }} style={{margin:15,Height:'auto',position:'relative',minHeight:700}} className='card' >
             <CardMedia
               component="img"
               alt="green iguana"
               height='140'
               style={{height:300,objectFit:'contain'}}
               image={obj.imgUrl}
             />
             <CardContent>
              <div style={{display:'flex',justifyContent:'space-between'}} >
              <Typography gutterBottom variant="h5" component="div">
                 {obj.brand}
                 {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
               </Typography>
               <Typography gutterBottom variant="BUTTON TEXT" component="div">
                 ${obj.price}/Day
               </Typography>
              </div>
               <Typography variant="subtitle2" color="text.secondary">
                   Available in :{obj.location}
               </Typography>
               <Typography variant="body2" color="text.secondary" marginTop={1}>
                 {obj.description}
               </Typography>
             </CardContent>
             <CardActions style={{bottom:0 , position:'absolute'}} >
               <Button className='btn' onClick={()=>navigate(`/productpage/${obj._id}`)} style={{color:'white',margin:10,backgroundColor:'#016DD9'}}>BOOK NOW</Button> 
               <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button>
               
             </CardActions>
           </Card>

         
       
                       </Grid>
                       
                      )
                      
                  })
                  
              }

               
           </Grid>
                : lowtohighdata.length > 0 ? 


                <Grid container >
              
              {
                  lowtohighdata.slice(0,visible).map((obj)=>{
                      return(
                       <Grid item xl={3}  lg={4} md={4} sm={6} xs={12} >
                       <Card sx={{ maxWidth: 345 }} style={{margin:15,Height:'auto',position:'relative',minHeight:700}} className='card' >
             <CardMedia
               component="img"
               alt="green iguana"
               height='140'
               style={{height:300,objectFit:'contain'}}
               image={obj.imgUrl}
             />
             <CardContent>
              <div style={{display:'flex',justifyContent:'space-between'}} >
              <Typography gutterBottom variant="h5" component="div">
                 {obj.brand}
                 {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
               </Typography>
               <Typography gutterBottom variant="BUTTON TEXT" component="div">
                 ${obj.price}/Day
               </Typography>
              </div>
               <Typography variant="subtitle2" color="text.secondary">
                   Available in :{obj.location}
               </Typography>
               <Typography variant="body2" color="text.secondary" marginTop={1}>
                 {obj.description}
               </Typography>
             </CardContent>
             <CardActions style={{bottom:0 , position:'absolute'}} >
               <Button className='btn' onClick={()=>navigate(`/productpage/${obj._id}`)} style={{color:'white',margin:10,backgroundColor:'#016DD9'}}>BOOK NOW</Button> 
               <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button>
               
             </CardActions>
           </Card>

         
       
                       </Grid>
                       
                      )
                      
                  })
                  
              }

               
           </Grid>


                : hightolowdata.length > 0 ?

                <Grid container >
              
                {
                    hightolowdata.slice(0,visible).map((obj)=>{
                        return(
                         <Grid item xl={3}  lg={4} md={4} sm={6} xs={12} >
                         <Card sx={{ maxWidth: 345 }} style={{margin:15,Height:'auto',position:'relative',minHeight:700}} className='card' >
               <CardMedia
                 component="img"
                 alt="green iguana"
                 height='140'
                 style={{height:300,objectFit:'contain'}}
                 image={obj.imgUrl}
               />
               <CardContent>
                <div style={{display:'flex',justifyContent:'space-between'}} >
                <Typography gutterBottom variant="h5" component="div">
                   {obj.brand}
                   {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
                 </Typography>
                 <Typography gutterBottom variant="BUTTON TEXT" component="div">
                   ${obj.price}/Day
                 </Typography>
                </div>
                 <Typography variant="subtitle2" color="text.secondary">
                     Available in :{obj.location}
                 </Typography>
                 <Typography variant="body2" color="text.secondary" marginTop={1}>
                   {obj.description}
                 </Typography>
               </CardContent>
               <CardActions style={{bottom:0 , position:'absolute'}} >
                 <Button className='btn' onClick={()=>navigate(`/productpage/${obj._id}`)} style={{color:'white',margin:10,backgroundColor:'#016DD9'}}>BOOK NOW</Button> 
                 <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button>
                 
               </CardActions>
             </Card>
  
           
         
                         </Grid>
                         
                        )
                        
                    })
                    
                }
  
                 
             </Grid>

                :


                <Grid container >
              
              {
                  carsData.slice(0,visible).map((obj)=>{
                      return(
                       <Grid item xl={3}  lg={4} md={4} sm={6} xs={12} >
                       <Card sx={{ maxWidth: 345 }} style={{margin:15,Height:'auto',position:'relative',minHeight:700}} className='card' >
             <CardMedia
               component="img"
               alt="green iguana"
               height='140'
               style={{height:300,objectFit:'contain'}}
               image={obj.imgUrl}
             />
             <CardContent>
              <div style={{display:'flex',justifyContent:'space-between'}} >
              <Typography gutterBottom variant="h5" component="div">
                 {obj.brand}
                 {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}   /> */}
               </Typography>
               <Typography gutterBottom variant="BUTTON TEXT" component="div">
                 ${obj.price}/Day
               </Typography>
              </div>
               <Typography variant="subtitle2" color="text.secondary">
                   Available in :{obj.location}
               </Typography>
               <Typography variant="body2" color="text.secondary" marginTop={1}>
                 {obj.description}
               </Typography>
             </CardContent>
             <CardActions style={{bottom:0 , position:'absolute'}} >
               <Button className='btn' onClick={()=>navigate(`/productpage/${obj._id}`)} style={{color:'white',margin:10,backgroundColor:'#016DD9'}}>BOOK NOW</Button> 
               <Button  onClick={()=>wishlist(`${obj._id}`)} >Add to wishlist</Button>
               
             </CardActions>
           </Card>

         
       
                       </Grid>
                       
                      )
                      
                  })
                  
              }

               
           </Grid>

            }


            
            

        </Container> 
      <div style={{justifyContent:'center',display:'flex'}} >
          {
              carsData.length === visible ?
              null:

      <Button onClick={showMoreItem} variant='contained'  >Load More<ArrowDropDownIcon/></Button>
          }
      
      {
         visible >4  ?
          <Button onClick={showLessItem}  variant='contained' style={{marginLeft:5}} >Load less<ArrowDropUpIcon/></Button>
          :
          null
      }

      
      </div>
    </div>
  )
}

export default Cards