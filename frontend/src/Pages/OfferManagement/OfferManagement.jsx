import { Box, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


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
  


function OfferManagement() {
    const [districtData , setDistrictData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [selectDistrict , setSelectDistrict] = useState()
    const [offerName , setOfferName] = useState()
    const [offerPrice,setOfferPrice] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [offerData , setOfferData] = useState([])
    const [deleteRender , setDeleteRender] = useState(false)
    const [getDataRender , setGetDataRender] = useState(false)
    const [deleteId , setDeleteId] = useState('')    
    const [delectDistrict , setDeleteDistritct] = useState('')


    console.log(deleteId , delectDistrict);

    // modal
    const [openmodal, setOpenmodal] = useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);


    const deleteData = () => {
      // // console.log(district);
      // // console.log(id);
      // setDeleteDistritct(district)
      //   setDeleteId(id)
      setOpenmodal(true);
    }

    // 
    // console.log(selectDistrict);

    const getDistrict = () =>  {
        axios.get('/api/user/getdistrict').then((res)=>{
            // console.log(res.data.Getdistrict);
            setDistrictData(res.data.Getdistrict)
        })
    }

    const handleOfferSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post('/api/admin/DistrictOffer',{
                selectDistrict , offerName , offerPrice
            }).then((res)=>{
                // console.log(res);  
            })
            setGetDataRender(true)
        } catch (error) {
            
        }
    }

    const getOffers = () => {
        try {
            axios.get('/api/admin/GetOffer').then((res)=>{
                // console.log(res.data.data);
                setOfferData(res.data.data)
            })
          
        } catch (error) {
            console.log("Error occured in the offer geeting section " , error);
        }
    }

    const handleDelete = () => {
        try {
            axios.post(`/api/admin/deleteoffer`,{"delectDistrict":delectDistrict,"deleteId":deleteId}).then((res)=>{
                console.log(res);
            })
            setDeleteRender(true)
            setOpenmodal(false);
        } catch (error) {
            console.log("error occured while deleting the offer",error);
        }
    }


    useEffect(()=>{
        getDistrict()
        getOffers()
    },[deleteRender, getDataRender])
  return (
    <div>
         <SideBar/>

         <Modal
        open={openmodal}
        onClose={handleClosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
            Are you sure want to Delete
          </Typography>
      <Box sx={{justifyContent:'center',display:'flex'}} >
      <Button onClick={handleDelete} >Yes</Button>
      <Button onClick={()=>setOpenmodal(false)} >No</Button>
      </Box>
        </Box>
      </Modal>

         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" textAlign='center' variant="h6" component="h2">
            Select Your District
          </Typography>
         <Box mt={2} >
             {
                 districtData.map((res,index)=>{
                     return(
                        <Button variant='text' key={index} onClick={()=>{
                            setSelectDistrict(`${res.district}`)
                            setOpen(false);
                        }} >{res.district}</Button>
                     )
                 })
             }
         </Box>
        </Box>
      </Modal>

         <Box sx={{paddingLeft:35 ,justifyContent:'center'}} >
            <Box marginLeft={90} >
                <Typography variant='h3' component='h2'  >
                        Offer Management
                </Typography>
            </Box>

            <Box mt={3} ml={3}  sx={{width:500}} marginLeft={88} >
                        <form onSubmit={handleOfferSubmit} >
                        <TextField id="outlined-basic" label="Offer Name" variant="outlined" sx={{width:'90%'}} onChange={(e)=>setOfferName(e.target.value)} />
                        
                        <TextField id="outlined-basic" label="Offer Amount" variant="outlined" sx={{width:'90%',mt:2}}  onChange={(e)=>setOfferPrice(e.target.value)} />

                        <Button variant='contained' sx={{width:'90%',marginTop:2,height:50}} onClick={handleOpen}>Select Distict</Button>

                        <Button style={{marginLeft:170,marginTop:20}} variant="contained" type='submit' color='success' >Add Offer</Button>
                        </form>
                    </Box>


                    <Box sx={{width:600,marginLeft:79}} marginTop={3}>

            <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Offer Name</TableCell>
            <TableCell align="center">Offer Amount</TableCell>
            <TableCell align="center">District</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      
    
            {
                offerData.map((obj,index)=>{
                    return(
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={index}
            >



             <TableCell component="th" scope="row"  >
              {obj.OfferName}
              </TableCell>
              <TableCell align="center">${obj.OfferPrice}</TableCell>
              <TableCell align="center">{obj.District}</TableCell>
              <TableCell align="center"><Button style={{color:'red'}} onClick={()=>deleteData(setDeleteId(`${obj._id}`),setDeleteDistritct(`${obj.District}`))} >Delete </Button></TableCell>
                                
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

export default OfferManagement