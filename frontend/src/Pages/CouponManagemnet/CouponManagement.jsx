import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import {useDispatch} from 'react-redux'


function CouponManagement() {
    const [couponname , SetCouponName] = useState('')
    const [discount , setDiscount] = useState('')
    const [showCoupon , setShowCoupon] = useState([])
    const [AddRender , setAddRender] = useState(false)
    const [dltRender , setDltRender] = useState(false)
    const [SnackMessage , SetSnackMessage] = useState('')
    const [CouponCode , SetCouponCode] = useState('')


// snackbar

const [state, setState] = React.useState(false)

  const { vertical, horizontal, open } = state;

 

  const handleClose = () => {
    setState(false);
  };


// 


        const handleSubmit = (e) => {
            e.preventDefault()

            // console.log(couponname);
            // console.log(discount);

          try {
            axios.post(`http://localhost:5000/api/admin/couponmanagement`,{couponname , discount ,CouponCode}).then((res)=>{
                SetSnackMessage(res.data.message)
            })
            setAddRender(true)
            setState(true);
          } catch (error) {
              console.log(error);
          }
        }


        const getCoupon = () => {
            try {
                axios.get('http://localhost:5000/api/admin/getcoupon').then((res)=>{
                    console.log(res.data.data);
                    setShowCoupon(res.data.data)
                })
            } catch (error) {
                console.log(error);
            }
        }

        const handleDelete = (id) => {
            console.log(id);

            try {
                axios.post(`http://localhost:5000/api/admin/deletecoupon/${id}`).then((res)=>{
                    // console.log(res.data.message);
                    SetSnackMessage(res.data.message)
                })
                setDltRender(true)
                setState(true);
            } catch (error) {
                    console.log(error);
            }

        }
        

  


        useEffect(()=>{
                getCoupon()
        },[AddRender , dltRender])

  return (
    <div>
        <SideBar/>

        {/* SnackBar */}
        <Snackbar
        open={state}
        onClose={handleClose}
        message={SnackMessage}
        key={vertical + horizontal}
      />
        {/*  */}

        <Box sx={{paddingLeft:35 ,justifyContent:'center'}} >
            <Box sx={{height:350,width:400,border:'3px solid black',marginLeft:70}} >
                    <Typography textAlign='center' variant='h5' component='h6' mt={3} fontFamily='egoe UI' >
                        Coupon Management
                    </Typography>

                    <Box mt={3} ml={4} >
                        <form onSubmit={handleSubmit}>
                        <TextField id="outlined-basic" label="Coupon Name" variant="outlined" sx={{width:'90%'}} onChange={(e)=>SetCouponName(e.target.value)} />
                        <TextField id="outlined-basic" label="Coupon Code" variant="outlined" sx={{width:'90%',mt:2}} onChange={(e)=>SetCouponCode (e.target.value)} />
                        <TextField id="outlined-basic" label="Discount Amount" variant="outlined" sx={{width:'90%',mt:2}} onChange={(e)=>setDiscount(e.target.value)} />
                        <Button style={{marginLeft:100,marginTop:20}} variant="contained" type='submit' color='success' >Add Coupon<AddIcon/></Button>
                        </form>
                    </Box>
            </Box>



            <Box sx={{width:600,marginLeft:60}} marginTop={3}>

            <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coupon Name</TableCell>
            <TableCell align="center">Discount Amount</TableCell>
            <TableCell align="center">Apply Code</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                showCoupon.map((Obj,index)=>{
                    return(
    
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={index}
            >
                                
             <TableCell component="th" scope="row"  >
                {Obj.couponname}
              </TableCell>
              <TableCell align="center">$ {Obj.discount}</TableCell>
              <TableCell align="center">{Obj.CouponCode}</TableCell>
              <TableCell align="center"><Button style={{color:'red'}} onClick={()=>handleDelete(`${Obj._id}`)} >Delete <DeleteIcon/> </Button></TableCell>
                                
            </TableRow>
                        )
                    })
                }
             
        </TableBody>
      </Table>
    </TableContainer>

            </Box>
        </Box>
    </div>
  )
}

export default CouponManagement