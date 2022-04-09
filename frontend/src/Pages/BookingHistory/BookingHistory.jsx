import { Container, Grid } from '@mui/material'
import React, { useEffect , useState} from 'react'
import AppBarHeader from '../../Components/AppBar/AppBar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';

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

function BookingHistory() {


  //modal
  const [open, setOpen] = React.useState(false);
  const handleClosemodal = () => setOpen(false);
  const [cancelId , setCancelId] = useState()
  // 

    const [state, setState] = useState(false)
    const [snack , setSnack] = useState('')
    const [render , setRender] = useState(false)
    const handleClose = () => {
        setState(false);
      };

    const [history , SetHistory] = useState([])
    // console.log(history);

    const user = localStorage.getItem('userInfo')
    const userId = JSON.parse(user)
    const USERID =  userId._id

    // console.log(USERID);

    const getBookingdata = () => {
        axios.post('http://localhost:5000/api/user/bookingdata',{"userId":USERID}).then((res)=>{
            // console.log(res);
            SetHistory(res.data.bookingData)
        })
    }

    const cancelhandler = (id) => {
      // console.log(id);
      setCancelId(id)
      setOpen(true);
    }

    const handleCancel = (id) => {
            // console.log(id);

            axios.post(`http://localhost:5000/api/user/cancel/${cancelId}`).then((res)=>{
                // console.log(res.data.Message);
                setState(true)
                setSnack(res.data.Message)
            })
            setOpen(false);
            setRender(true)

    }

    useEffect(()=>{
            getBookingdata()
    },[render])

  return (
    <div>

<Modal
        open={open}
        onClose={handleClosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
            Are you sure want to cancel
          </Typography>
      <Box sx={{justifyContent:'center',display:'flex'}} >
      <Button onClick={handleCancel} >Yes</Button>
      <Button onClick={()=>setOpen(false)} >No</Button>
      </Box>
        </Box>
      </Modal>

<Snackbar
        // anchorOrigin={{ vertical, horizontal }}
        open={state}
        onClose={handleClose}
        message={snack}
        // key={vertical + horizontal}
      />
        <AppBarHeader/>
        <br/>
        <br/>
        <br/>
        <br/>

        <Container>
    <Typography variant='h4' component='h6' >BOOKING HISTORY</Typography>
    <br/>
    <br/>

    <Grid container spacing={2} >
{
    history.map((obj , index)=>{
        return(
                <Grid item sm={12} xs={12} md={4} lg={3} xl={3} key={index} >
            <Card sx={{ minWidth: 275 }} >
      <CardContent>
        <Typography variant="h5" component="div"  >
          Car : {obj.carname}
        </Typography>
        <br/>  
        <Typography  color="text.secondary">
          Trip Start : {obj.startDate}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Trip End : {obj.endDate}
        </Typography>
        <Typography variant="body2">
          Total Rent : {obj.PayedAmount}
        </Typography>
      </CardContent>
      <CardActions>
        {
            obj.cancel === true ? <Typography variant='subtitle2' color='error' component='div' >Cancelled</Typography> : obj.complete ? <Typography variant='subtitle2' color='#8bc34a' component='div' >Completed</Typography> : <Button size="small"  variant='outlined' color='error'  onClick={()=>cancelhandler(`${obj._id}`)}  >Cancel Booking <CancelIcon/> </Button>
        }
      </CardActions>
    </Card>
    </Grid>

   

)
})
}

</Grid>
            
        </Container>
        
        </div>
  )
}

export default BookingHistory