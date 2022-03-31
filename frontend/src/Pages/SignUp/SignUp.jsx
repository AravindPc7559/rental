import React, { useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import ErrorMessage from "../ErrorMessage";
import {useNavigate} from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import Loading from "../../Components/Loading/Loading";
import './signup.css'



const useStyle = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: "auto",
    width: 300,
    margin: "90px auto",
    overflowY:'none'
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
    height:"100vh",
    }
}));

function SignUp() {
  const navigate = useNavigate()

  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo')
    if(userInfo){
      navigate('/')
    }else{
      navigate('/register')
    }
  },[navigate])


  //style side
  const classes = useStyle();
  const {register , handleSubmit ,formState:{errors}} = useForm()
 
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const handleChange = (event) => {
    event.preventDefault();
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    event.preventDefault();
    setGender(event.target.value);
  };
  const handleChange3 = (event) => {
    event.preventDefault();
    setDistrict(event.target.value);
  };

  const submitHandle = async(data) => {
    
      const {name,email,password,confirmPassword,address,phone} = data

      
  if(password !== confirmPassword){
   setError("Password Not Matching")
  }else{
    
    setLoading(true)
     try {
    
         const config = {
           headers: {
               "Content-type": "application/json"
           }
         }

      

     const {data , status} =   await axios.post('http://localhost:5000/api/user/signup',{
     name , email , phone , address , password  ,age , gender , district
     },config)

     console.log(data);


     localStorage.setItem('userInfo',JSON.stringify(data))
     setLoading(false)
     navigate('/')
     } catch (error) {
       console.log(error);
       setLoading(false)
       setError("Cannot use the existed data(email,phone)")
     }

    }
  
  }

  return (
  
    <div className={classes.main}>
     <form onSubmit={handleSubmit(submitHandle)}>
       {loading ? <Loading/> : 
     <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="Center">
            <Avatar className={classes.avatarStyle}>
              <LockoutLinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Grid>
          <TextField
            variant="standard"
            label="Name"
            placeholder="Enter Name"
            type="text"
            fullWidth
            name="name"
            // onChange={(e)=>setName(e.target.value)}
            {...register('name',{required:"Name is required" , minLength:{value:2,message:"minimum length is 2"}})}
          />
          <p style={{color:'red',fontSize:'12px'}}>{errors.name && errors.name.message}</p>
          <TextField
            variant="standard"
            label="Email"
            name='email'
            placeholder="Enter Email"
            type="text"
            fullWidth
            // onChange={(e)=>setEmail(e.target.value)}
            {...register('email',{required:"email is required" ,pattern:{value:/^\S+@\S+$/i,message:"This is not a valid email"}})}
          />
          <p style={{color:'red',fontSize:'12px'}}>{errors.email && errors.email.message}</p>
          <TextField
            variant="standard"
            label="Phone"
            placeholder="Enter Phone"
            type="number"
            name="phone"
            fullWidth
            // onChange={(e)=>setPhone(e.target.value)}
            {...register('phone',{required:"Number is required",minLength:{value:'10',message:"Phone Number requires 10 digits"},maxLength:{value:'10',message:'maximum length is 10 digit'}})}
          />
           <p style={{color:'red',fontSize:'12px'}}>{errors.phone && errors.phone.message}</p>
          <TextField
            variant="standard"
            label="Address"
            placeholder="Enter Your Address"
            type="text"
            name='address'
            fullWidth
            {...register('address',{required:"Address is requires"})}
            // onChange={(e)=>setAddress(e.target.value)}
          />
 <p style={{color:'red',fontSize:'12px'}}>{errors.address && errors.address.message}</p>
          {/* Gender and age */}

          <Grid container spacing={2}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-customized-select-native">
                Age
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <option aria-label="None" value="" />
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
                <option>32</option>
                <option>33</option>
                <option>34</option>
                <option>35</option>
                <option>36</option>
                <option>37</option>
                <option>38</option>
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
                <option>44</option>
                <option>45</option>
              </NativeSelect>
            </FormControl>

            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-customized-select-native">
                Gender
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={gender}
                onChange={handleChange2}
                label="gender"
              >
                <option aria-label="None" value="" />
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          {/* State and district */}
          <br />
          <Grid container spacing={1}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-customized-select-native">
                District
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={district}
                onChange={handleChange3}
                label="district"
              >
                <option aria-label="None" value="" />
                <option>Kottayam</option>
                <option>Ernakulam</option>
                <option>Kozhikode</option>
                <option>Idukki</option>
                <option>Malappuram</option>
                <option>kannu</option>
              </NativeSelect>
            </FormControl>
            </Grid>

        {/* Password area */}
          <TextField
            variant="standard"
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            name="password"
            {...register('password',{required:"Password is required",minLength:{value:'6',message:"Minimum limit is 6"}})}
            // onChange={(e)=>setPassword(e.target.value)}
          />
           <p style={{color:'red',fontSize:'12px'}}>{errors.password && errors.password.message}</p>
          <TextField
            variant="standard"
            label="Confirm Password"
            placeholder="Confirmm Password"
            type="password"
            fullWidth
            name="confirmPassword"
            {...register('confirmPassword',{required:"ConfirmPassword is required",minLength:{value:'6',message:"Minimum limit is 6"}})}
            // onChange={(e)=>setConfirmPassword(e.target.value)}
          />

        <p style={{color:'red',fontSize:'12px'}}>{errors.confirmPassword && errors.confirmPassword.message}</p>
          <div className={classes.btn}>
            <div className={classes.btn1} >
          <Link to='/' style={{textDecoration:'none'}}>
          <Button
            type="button"
            color="error"
            variant="contained"
            // fullWidth
            className={classes.btnstyle}
          >
           <CloseIcon/>
            Close
          </Button>
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
            Sign Up
            <LoginIcon/>
          </Button>
            </div>
          </div>
        
          <br/>
          
          <Typography style={{textAlign:"center"}}>
            Already have an account
            <Link to="/login" style={{textDecoration:'none'}}>Sign In?</Link>
          </Typography>
        
        </Paper>
      </Grid>
}
     </form>
    </div>

  );
}

export default SignUp;
