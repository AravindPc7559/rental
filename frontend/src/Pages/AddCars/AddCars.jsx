import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { TextField, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';


const useStyles =makeStyles({

    root:{
        marginTop:100,
        height:'auto'
        
    },
    container:{
        overflowY:'hidden',
        backgroundImage: `url("https://wallpaperaccess.com/full/2702341.jpg")`,
        width:'100%',
        height:'100vh'
    },
    fields:{
        height:50,
        marginLeft:20,
        width:300,
    },
    label:{
        marginLeft:20
    },
    btnAddCar:{
       justifyContent:'flex-end',
       display:'flex',
       marginRight:100,
       marginTop:20,
       paddingBottom:20,
    },
    text:{
        marginLeft:20,
        paddingTop:20
    },
    formBox:{
        marginLeft:30
    },
    btn:{
        height:50,
        width:150,
        backgroundColor:'grey',
        color:'white',
        fontSize:18,
        border:'2px solid white '
    }
 
})



function AddCars() {
    const {register , handleSubmit ,formState:{errors}} = useForm()


    const classes = useStyles();
    const [img,setImg] = useState()
    const [resData ,setresData] = useState({})
    const navigate = useNavigate()
    const [loading , setloading] = useState(false)
    const loc = localStorage.getItem('Admin')


    const submitHandle = async(data)=>{
        const {url,brand,model,fueltype,RegNo,price,seats,location,mileage,register,description} = data
        
        console.log(url,brand,model,fueltype,RegNo,price,seats,location,mileage,register,description);

       const formdata = new FormData();
        formdata.append("Brand", brand);
        formdata.append("Model", model);
        formdata.append("FuelType" , fueltype);
        formdata.append("RegNo" , RegNo);
        formdata.append("Price",price);
        formdata.append("Seats",seats);
        formdata.append("Location",location);
        formdata.append("Mileage",mileage);
        formdata.append("Register",register);
        formdata.append("Description",description)
        formdata.append('Url',url)
        formdata.append("Image" , img)
   

        try {
              setloading(true)
          const config = {
            headers: {
                "Content-type": "application/json"
            }
          }
          console.log("triggerd");
          const data  = await axios.post('http://localhost:5000/api/admin/addcar',formdata
          ,config)


          setresData(data.data)
          navigate('/admin/carManagement')
        setloading(false)
          
     } catch (error) {
         console.log(error);
         setloading(false)
     }
    }

    useEffect(()=>{
      if(loc){
        navigate('/admin/addcars')
      }else{
        navigate('/admin')
      }
    },[])

// console.log(resData.id);

  return (
   <div className={classes.container} >
     {
       loading ? <Loading/> :
     

        <Container maxWidth='lg'   >
        <Box sx={{ flexGrow: 1 }}>
        <Paper elevation={5} className={classes.root} >
            <div  className={classes.text}>
            <Typography   variant='h4' component='h5' >
                Add Cars
            </Typography>
            </div>
        <form onSubmit={handleSubmit(submitHandle)} encType='multipart/form-data' >
            <Box className={classes.formBox}>
            <Grid container >
          <Grid item md={6} xs={12} lg={4} marginTop={2}   >
          <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.brand && errors.brand.message}</label>

                <br/>
                
            <TextField
        
            label="Brand Name"
            placeholder="Enter Name"
            type="text"
            name="brand"
            {...register('brand',{required:"brand is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />
            </Grid>


            <Grid item md={6} xs={12} lg={4} marginTop={2}   >
                <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.model && errors.model.message}</label>
                <br/>
                <TextField
            
            label="Model"
            placeholder="Enter Model"
            type="text"
            name="model"
            {...register('model',{required:"model is required",minLength:{value:2,message:"minimum length is 2"} })}
          />            
          </Grid>

          <Grid item md={6} xs={12} lg={4} marginTop={2}   >
                <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.fueltype && errors.fueltype.message}</label>
                <br/>
                <TextField
            
            label="Fuel Type"
            placeholder="Petrol/Diesel"
            type="text"
            name="fueltype"
            {...register('fueltype',{required:"Fuel Type is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />            
          </Grid>


            <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.RegNo && errors.RegNo.message}</label>
                <br/>
                <TextField
            
            label="Register Number"
            placeholder="Enter Register No"
            type="text"
            name="RegNo"
            {...register('RegNo',{required:"Reg No is required" , minLength:{value:2,message:"minimum length is 4"}})}
          />
            </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.price && errors.price.message}</label>
                <br/>
                <TextField
            
            label="Price/day"
            placeholder="Enter Amount"
            type="number"
            name="price"
            {...register('price',{required:"price/Day is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />            
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.seats && errors.seats.message}</label>
                <br/>
                <TextField
            
            label="No of seats"
            placeholder="Enter no of seats"
            type="number"
            name="seats"
            {...register('seats',{required:"No of seats is required" })}
          />            
          
          </Grid>
          
            <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.location && errors.location.message}</label>
                <br/>
                <TextField
            
            label="Pickup Location"
            placeholder="Enter Pickup Location"
            type="text"
            name="location"
            {...register('location',{required:"Location is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />           
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.mileage && errors.mileage.message}</label>
                <br/>
                <TextField
            
            label="Mileage"
            placeholder="Enter Mileage in liter"
            type="number"
            name="mileage"
            {...register('mileage',{required:"Mileage is required" })}
          />            
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.register && errors.register.message}</label>
                <br/>
                <TextField
            
            label="Car Registration Date"
            placeholder="Enter registration details"
            type="text"
            name="register"
            {...register('register',{required:"Registration date is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />           
          </Grid>

          <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.label}  >{errors.description && errors.description.message}</label>
                <br/>
                <TextField
            
            label="Description"
            placeholder="Enter Description about car"
            type="text"
            multiline
            name="description"
            {...register('description',{required:"Description is required" , minLength:{value:10,message:"minimum length is 10"}})}
          />           
          </Grid>

          
          
            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Aditional Details"
            placeholder="Optional"
            value="none"
            type="text"
            
            {...register('name',{required:"brand is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />            
          </Grid>

          <Grid item md={6} xs={12} lg={4} marginTop={2} >
            <label style={{color:'red',fontSize:'12px'}} htmlFor="" className={classes.url}  >{errors.register && errors.url.message}</label>
                <br/>
                <TextField
            
            label="Image Url"
            placeholder="Enter Car image Url"
            type="url"
            name="url"
            {...register('url',{required:"image url is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />           
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
       

          <input type="file" onChange={(e)=>setImg(e.target.files[0])}  />
          </Grid>

       


        </Grid>
        
       <div className={classes.btnAddCar}>
        <input className={classes.btn} type="submit" value="submit" />       
        
        </div>
            </Box>
            </form>
        
      </Paper>
        </Box>
    </Container>
}
   </div>
  )
}

export default AddCars