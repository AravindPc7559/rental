import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import LockoutLinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Modal from '@mui/material/Modal';
import {useNavigate} from 'react-router-dom'
import ErrorMessage from "../ErrorMessage";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import Loading from "../../Components/Loading/Loading";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import ClearIcon from '@mui/icons-material/Clear';

const useStyle = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: "auto",
    width: 300,
    margin: "190px auto",
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



//modal style of login with otp

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//modal style of login with otp


function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function Login() {
  //style side
  const classes = useStyle();
  const navigate = useNavigate()
  const [error , setError] = useState()
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [mobNumber , setMobNumber] = useState()
  const[otp,setOtp] = useState()
  const [otpstatus , setOtpStatus] = useState()
  const [loginDataByOtp , setLoginDataByOtp] = useState({})
  const [otpnumbererror , setOtpNumberError] = useState(false)


  console.log(loginDataByOtp);

  console.log(otpstatus);
  // console.log(otp);

  // console.log(mobNumber);

  // Modal state and function
  const [modalOpen, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const [OtpModal ,  setOtpModal] = useState(false)
// Modal state and function


  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo')
    if(userInfo){
      navigate('/')
    }else{
      navigate('/login')
    }
  },[navigate])

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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

         const {data , status} = await axios.post('http://localhost:5000/api/user/login',{
           email,password
         },config)

         localStorage.setItem('userInfo',JSON.stringify(data))
         setLoading(false)
         navigate('/')

         
    } catch (error) {
      setLoading(false)
        console.log(error);
        setError("Invalid Login Access!")
    }
    
  }



  // sending otp MobNumber

  

  const LoginWithOtpHandle = (e) => {
      e.preventDefault()


      try {
        
        const config = {
          headers: {
              "Content-type": "application/json"
          }
        }

        axios.post('http://localhost:5000/api/user/otpnumber',{mobNumber},config).then((res)=>{
          console.log(res);
        })


        setOpenModal(false);
      setOtpModal(true)
      } catch (error) {
          console.log(error);
          setOtpNumberError(true)
          setOtpModal(false)
      }



      


  }




// validatinf the otp
  const otpValidate = (e) => {
    e.preventDefault()
    setLoading(true)

    try {
        
      const config = {
        headers: {
            "Content-type": "application/json"
        }
      }

      axios.post('http://localhost:5000/api/user/otpvalidate',{otp,mobNumber},config).then((res)=>{
        // console.log(res.data.res.status);
        // console.log(res.data);
        setLoginDataByOtp(res.data)
        setOtpStatus(res.data.res.status)
      })


      if(otpstatus === "approved"){
        localStorage.setItem('userInfo',JSON.stringify(loginDataByOtp))
        navigate('/')
      }else{
        navigate('/login')
      }

      setOpenModal(false);
    setOtpModal(true)
    setLoading(false)
    } catch (error) {
      setLoading(false)
        console.log(error);
        setOtpNumberError(true)
        setOtpModal(false)

    }



  }

  const otpModalClose =()=>{
    setOtpModal(false)
  }

  


  return (
    <div  className={classes.main}>
     <form onSubmit={handleSubmit(submitHandle)}>
       {loading ? <Loading/> :
     <Grid  >
        <Paper container  elevation={10} className={classes.paperStyle}>
          <Grid align="Center">
            <Avatar className={classes.avatarStyle}>
              <LockoutLinedIcon />
            </Avatar>
            <h2>Sign In</h2>
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

            onClick={handleClick(TransitionUp)}
          >
            Login
            <LoginIcon/>
          </Button>
            </div>
          </div>
        
          <br/>
          <br/>
          <Typography style={{textAlign:"center"}}>
            <Button  onClick={handleOpen}>Login With Otp</Button>
          </Typography>
          <br/>
          
          <Typography style={{textAlign:"center"}}>
            Already have an account
            <Link to="/register"  style={{textDecoration:'none'}}>Sign Up?</Link>
          </Typography>
          <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Something went wrong...Uppss"
        key={transition ? transition.name : ''}
      />
          <br/>

        </Paper>
      </Grid>
}
     </form>


     <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h6" component="h2">
                {otpnumbererror ? "Your Number is not registerd" : "Enter your Mobile Number"}
          </Typography>
          <form  onSubmit={LoginWithOtpHandle} >
           <div style={{display:'flex',justifyContent:'center'}} >
           <input type="number" placeholder="Mobile Number" required style={{width:200,height:50,border:'1px solid black',textAlign:'center'}} maxLength={10}  onChange={(e)=>setMobNumber(e.target.value)} />
           </div>
          <div style={{justifyContent:'center', display:'flex',marginTop:10}} >
          <Button style={{height:40,width:100}}  variant='outlined' type='submit' >LogIn</Button>
          </div>
          </form>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>

      <Modal
        open={OtpModal}
        onClose={otpModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Button onClick={otpModalClose} > <ClearIcon  /></Button>
          <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h6" component="h2">
                Enter Your Otp Number
          </Typography>
          <form onSubmit={otpValidate}>
           <div style={{display:'flex',justifyContent:'center'}} >
           <input type="number" placeholder="Otp Number" required style={{width:200,height:50,border:'1px solid black',textAlign:'center'}}  onChange={(e)=>setOtp(e.target.value)}  />
           </div>
          <div style={{justifyContent:'center', display:'flex',marginTop:10}} >
          <Button style={{height:40,width:100}}  variant='outlined' type='submit' >Verify</Button>
          </div>
          </form>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>

       
    </div>
  );
}

export default Login;
