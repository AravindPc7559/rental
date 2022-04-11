import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import LockoutLinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Loading from "../../Components/Loading/Loading";
import {useNavigate} from 'react-router-dom'
import ErrorMessage from "../ErrorMessage";


const useStyle = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: "auto",
    width: 300,
    margin: "20px auto",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
  },
  btnstyle: {
    margin: "8px 0",
  },
  stateGride:{
      display:'flex'
  },
  btn:{
    display:'flex',
    justifyContent:'center'
  },
  btn1:{
    marginRight:'12px'
  },
  main:{
    backgroundImage: `url("https://wallpaperaccess.com/full/2702341.jpg")`,
    overflowY:'hidden',
    height:"100vh"
  }
}));

function AdminLogin() {
  //style side
  const classes = useStyle();
  const navigate = useNavigate()
  const [error , setError] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const adminInfo = localStorage.getItem('Admin')
    if(adminInfo){
      navigate('/admin/adminhomepage')
    }else{
      navigate('/admin')
    }
  },[navigate])


  const {register , handleSubmit ,formState:{errors}} = useForm()
  const submitHandle = async(data) => {
    setLoading(true)


    const {email,password} = data


    try {

         const config = {
           headers: {
               "Content-type": "application/json"
           }
         }

         const {data , status} = await axios.post('/api/admin/adminlogin',{
           email,password
         },config)

         localStorage.setItem('Admin',JSON.stringify(data))
         navigate('/admin/adminhomepage')
         setLoading(false)

         
    } catch (error) {
      console.log(error);
      setLoading(false)
        setError("Invalid email or password")
    }
    
  }


  return (
    <div className={classes.main}>
     <form onSubmit={handleSubmit(submitHandle)}>
     <Grid marginTop={12} >
       {loading ? <Loading/> : 
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="Center">
            <Avatar className={classes.avatarStyle}>
              <LockoutLinedIcon />
            </Avatar>
            <h2>Admin Log In</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Grid>
    
          <TextField
            variant="standard"
            label="Email"
            placeholder="Enter Email"
            type="email"
            fullWidth
            name="email"
            // onChange={(e)=>setEmail(e.target.value)}
            {...register('email',{
                required:"Email is required",pattern:{value:/^\S+@\S+$/i,message:"This is not a valid email"}
            })}
          />
          <p style={{color:'red',fontSize:'12px'}} >{errors.email && errors.email.message}</p>

         
        {/* Password area */}
          <TextField
            variant="standard"
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
           name="password"
            // onChange={(e)=>setPassword(e.target.value)}
            {...register('password',{required:'Password is required' , minLength:{value:6,message:"Minimum length is 6 characters"}})}
          />
          <p style={{color:'red',fontSize:'12px'}} >{errors.password && errors.password.message}</p>
          <br />
          <br/>
          <div className={classes.btn}>
            <div className={classes.btn1} >
          <Link to='/' style={{textDecoration:'none'}}>
          </Link>
            </div>
            <div className="btn2">
            <Button
            type="submit"
            color="primary"
            variant="contained"
            // fullWidth
            className={classes.btnstyle}
          >
            Login
          </Button>
            </div>
          </div>
        </Paper>
}
      </Grid>
     </form>
    </div>
  );
}

export default AdminLogin;
