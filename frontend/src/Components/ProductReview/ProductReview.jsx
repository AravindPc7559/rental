import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'

function ProductReview({id}) {
  const [review,setReview] = useState('')
  const [userName , setUserName] = useState()
  const[carId , setCarID] = useState()
  const data = localStorage.getItem('userInfo')
  const value = JSON.parse(data)
  const [render,setRender] = useState(0)
  const [comments,setComments]= useState([])



  // console.log(resCarId);
 
  const namesetting = () => {
    {
      value &&     setUserName(value.name)

    }
    setCarID(id)
  }
  




  const handleReview = (e) => {
      e.preventDefault()

     try {
      axios.post('http://localhost:5000/api/user/postingcomment',{
        userName,review,carId
      }).then((response)=>{
        console.log(response);
      })

      setRender(render+1)

     } catch (error) {
       console.log("Something happend" , error);
     }


  }


  const GetReviews = () => {
    
    try {
      axios.post('http://localhost:5000/api/user/gettingreviews',
        {carId}
      ).then((responce)=>{
        console.log(responce.data.carData);
        setComments(responce.data.carData)
      })
    } catch (error) {
        console.log(error);
    }
  }


  const handleDelete = (id)=>{

    try {
      axios.post(`http://localhost:5000/api/user/deletecomment/${id}`).then((res)=>{
        console.log(res);
      })
      
      setRender(render+1)
    } catch (error) {
      
    }

  }


  useEffect(()=>{
    namesetting()
    GetReviews()
  },[render])
 
  return (
    <div>
      
              {value ? 
        <Box marginTop={5} marginLeft={5} >
            <Typography variant='h6' component='h6' >Write a review about the product?</Typography>
            <form onSubmit={handleReview} >
              <div  style={{display:'flex'}} >
              <div style={{width:"90%"}} >
            <TextField id="standard-basic" label="Say Something Nice" variant="standard"  fullWidth  onChange={(e)=>setReview(e.target.value)} />
              </div>
              <div style={{marginTop:10}}>
              <Button variant='contained' type='Submit' >Submit</Button>
              </div>            
              </div>
            </form>
            <br/>
        </Box>
              :
              <Typography  variant='p' component='h6' sx={{color:'red',border:'2px solid red',padding:1.5,marginTop:10,justifyContent:'center',display:'flex'}} >
              Please Login To Write Review!
            </Typography>
              }

       {
         value ?
         <Box marginTop={3} marginLeft={5} >
         <Typography variant='h6' component='h6' >Reviews</Typography>
       </Box>
       :
       null
       }

    <Grid  container>      
      <Grid item xs={12} lg={12} sm={12} md={12} xl={12}  >
        {comments.map((data)=>{
          return(
       
             <Box margin={2}>
            {
              data.carId === carId  ?
              <Paper elevation={6} sx={{width:'100%',height:'auto'}} > 
              <Typography sx={{marginLeft:3 ,paddingTop:2}} variant='h6' component='h6' >{data.userName}</Typography>
              <Box>
                <Typography variant='body1' component='h6' sx={{margin:3}} >
                  {data.review}
                </Typography>
                {
                  userName === data.userName ?
                  <Button sx={{marginLeft:2}}  onClick={()=>handleDelete(`${data._id}`)} >Delete</Button>
                  :
                  null
                }
              </Box>
              <br/>
            </Paper>
            :
            null
            }
           </Box>
         
          )
        })}


        
          </Grid>
         

          
          </Grid>
          
        
    </div>
  )
}

export default ProductReview