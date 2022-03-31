import React, { useEffect, useState ,  } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useNavigate , useParams} from 'react-router-dom'
import Modal from '@mui/material/Modal';
import { TextareaAutosize, TextField } from '@mui/material';
import Loading from '../../Components/Loading/Loading';



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

const styleOne = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CarManagement() {
  const [adminCar,adminCarManagement] = useState([]);
  const navigate = useNavigate()
const loc = localStorage.getItem('Admin')
const [deleteId , setDeleteId] = useState()
const [ render , setRender] = useState(false)
const edit = useParams()
const [carEditData , SetCarEditData] = useState({})
const [updateid , setupdateId] = useState()
const [loading,setloading] =useState(false)
//  

// console.log(carEditData);


//states of field
const[Brand , SetBrand] = useState('')
const[Model ,setModel]  = useState('')
const[Description , SetDescription] = useState('')
const [FuelType , setFuelType] = useState('')
const[Location , SetLocation] = useState('')
const [Mileage , SetMileage] = useState('')
const[Price,SetPrice] = useState('')
const[Regno , SetRegNo]= useState('')
const[Register,SetRegister] = useState('')
const[Seat,SetSeat] = useState('');
const[Url , SetUrl] = useState('') 
const [img , setImg] = useState()
const [id, setId] = useState()
console.log(id);

// console.log(img);

//modal
const [open, setOpen] = React.useState(false);

// edit modal handle
const [openModal, setOpenModal] = React.useState(false);
const handleOpenEdit = () => setOpenModal(true);
const handleCloseEdit = () => setOpenModal(false);



// delete modal handle
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false);

const dtlFun = (id) => {
    setDeleteId(id)
    handleOpen()
}


// getting data
  const carManagement = async()=>{
   try {
    const data = await axios.get('http://localhost:5000/api/user/getcarData').then((res)=>{
        adminCarManagement(res.data.data)
    })
   } catch (error) {
      console.log(error); 
   }
  }

  //deleting data
    const DeleteCar = async() =>{
       console.log(deleteId);

         try {
            const config = {
              headers: {
                  "Content-type": "application/json",
              },
          }

            await axios.post('http://localhost:5000/api/admin/deletecar',
              {deleteId}
            ,config)

            handleClose()
            setRender(true)
          } catch (error) {
            console.log("Something went wrong" , error);
          }



    }

  // cardetailsgettingAPI



    const getCarDetails = async(id) => {
      setupdateId(id)
      handleOpenEdit()
      // console.log(id);
      try {
        const config = {
          headers: {
              "Content-type": "application/json",
          }
      }

    await axios.get(`http://localhost:5000/api/admin/getallcardetails/${id}`).then((res)=>{
        console.log(res.data.Brand);
        SetBrand(res.data.Brand)
        setFuelType(res.data.FuelType)
        setModel(res.data.Model)
        SetLocation(res.data.Location)
        SetMileage(res.data.Mileage)
        SetPrice(res.data.Price)
        SetRegNo(res.data.RegNo)
        SetSeat(res.data.Seats)
        SetUrl(res.data.Url)
        SetDescription(res.data.Description)
        SetRegister(res.data.Register)
        setId(res.data._id)

        // SetCarEditData(res.data)
      })


  
    }catch(error){
        console.log(error);
      }


    }

    const formSubmit = async() => {

      const formdata = new FormData();
      formdata.append("Brand", Brand);
      formdata.append("Model", Model);
      formdata.append("FuelType" , FuelType);
      formdata.append("RegNo" , Regno);
      formdata.append("Price",Price);
      formdata.append("Seats",Seat);
      formdata.append("Location",Location);
      formdata.append("Mileage",Mileage);
      formdata.append("Register",Register);
      formdata.append("Description",Description)
      formdata.append('Url',Url)
      formdata.append("Image" , img)
      formdata.append('id',updateid)
      try {

        const config = {
          headers: {
              "Content-type": "application/json"
          }
        }

      
        const data = await axios.patch('http://localhost:5000/api/admin/updatecardata',formdata,config).then((res)=>{
          console.log(res);
        })

        
      } catch (error) {
          console.log(error);
      }
    }

    


console.log(carEditData);

  useEffect(()=>{
    if(loc){
      navigate('/admin/carManagement')
    }else{
      navigate('/admin')
    }
    // console.log("Admin Car management");
      carManagement()

  },[render])


  

  return (
<div>
         <SideBar/>


{/*  delete  Modal  start */}

         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" textAlign='center' variant="h6" component="h2">
           Are You Sure Want to Delete
          </Typography>
            <div style={{display:'flex',justifyContent:'space-evenly',marginTop:20}} >
              <div>
                <Button variant='contained'  onClick={DeleteCar} >Yes</Button>
              </div>
              <div>
                <Button  variant='contained' onClick={handleClose}>NO</Button>
              </div>
            </div>
        </Box>
      </Modal>23
{/* modal end */}


{/* Edit modal start */}

<Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={openModal}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={styleOne}>
          
        <form onSubmit={formSubmit} encType='multipart/form-data'  >
            <Box >
            <Typography gutterBottom variant="h6" component="div">
          Update Field
        </Typography>
       


                   <Grid container >
          <Grid item md={6} xs={12} lg={4} marginTop={2}   >

                <br/>
                
            <TextField
        
            label="Brand Name"
            placeholder="Enter Name"
            type="text"
            name="brand"
            value={Brand}
            onChange={(e)=>SetBrand(e.target.value)}
          />
            </Grid>


            <Grid item md={6} xs={12} lg={4} marginTop={2}   >
                <br/>
                <TextField
            
            label="Model"
            placeholder="Enter Model"
            type="text"
            name="model"
            value={Model}
            onChange={(e)=>setModel(e.target.value)}
          />            
          </Grid>

          <Grid item md={6} xs={12} lg={4} marginTop={2}   >
                <br/>
                <TextField
            
            label="Fuel Type"
            placeholder="Petrol/Diesel"
            type="text"
            name="fueltype"
            value={FuelType}
            onChange={(e)=>setFuelType(e.target.value)}
          />            
          </Grid>


            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Register Number"
            placeholder="Enter Register No"
            type="text"
            value={Regno}
            name="RegNo"
            onChange={(e)=>SetRegNo(e.target.value)}
          />
            </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Price/day"
            placeholder="Enter Amount"
            type="number"
            name="price"
            value={Price}
            onChange={(e)=>SetPrice(e.target.value)}
          />            
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="No of seats"
            placeholder="Enter no of seats"
            type="number"
            name="seats"
            value={Seat}
            onChange={(e)=>SetSeat(e.target.value)}
          />            
          
          </Grid>
          
            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Pickup Location"
            placeholder="Enter Pickup Location"
            type="text"
            name="location"
            value={Location}
            onChange={(e)=>SetLocation(e.target.value)}
          />           
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Mileage"
            placeholder="Enter Mileage in liter"
            type="number"
            name="mileage"
            value={Mileage}
            onChange={(e)=>SetMileage(e.target.value)}
          />            
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Car Registration Date"
            placeholder="Enter registration details"
            type="text"
            name="register"
            value={Register}
            onChange={(e)=>SetRegister(e.target.value)}
          />           
          </Grid>

          <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextareaAutosize
            maxRows={4}
            label="Description"
            placeholder="Enter Description about car"
            type="text"
            name="description"
            value={Description}
            style={{ width: 240 ,height:70}}
            onChange={(e)=>SetDescription(e.target.value)}
          />           
          </Grid>

          
          
            <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Aditional Details"
            placeholder="Optional"
            value="none"
            type="text"
          
          />            
          </Grid>

          <Grid item md={6} xs={12} lg={4} marginTop={2} >
                <br/>
                <TextField
            
            label="Image Url"
            placeholder="Enter Car image Url"
            type="url"
            name="url"
            value={Url}
            onChange={(e)=>SetUrl(e.target.value)}
          />           
          </Grid>

            <Grid item md={6} xs={12} lg={4} marginTop={2} >
       

          <input type="file"  defaultValue={null}  onChange={(e)=>setImg(e.target.files[0])}  />
          </Grid>

       


        </Grid>




       <div style={{justifyContent:'end' , display:'flex' }} >
        <input   type="submit" value="submit"  style={{width:100,height:50}}/>       
        
        </div>
            </Box>
            </form>
        </Box>
      </Modal>

{/* modal edn */}



<Box sx={{ flexGrow: 1 ,paddingLeft:40 }}>
<div style={{justifyContent:'end'}} >
          <Link to='/admin/addcars' >
          <Button variant='contained' >ADD CAR</Button>
          </Link>
         </div>
  <Grid container spacing={4} mt={5} >
  
         {

           adminCar.map((obj,index)=>{
             return(
     
           <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  >
           <Card sx={{ maxWidth: 345 }}  style={{height:450}} key={index} >
      <CardMedia
        component="img"
        height="140"
      
        style={{height:300,objectFit:'contain'}}
        image={require(`../../assets/CarImg/${obj._id}.jpg`)}
        alt={obj.Url}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {obj.Brand} {obj.Model}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" variant='contained' onClick={()=>getCarDetails(`${obj._id}`)} >Edit<EditOutlinedIcon/></Button>
        <Button size="medium" color="error" variant='contained' onClick={()=>dtlFun(`${obj._id}`)}>Delete<DeleteIcon/></Button>
      </CardActions>
    </Card>
     </Grid>
             )
            })
            
          }
          </Grid>
          </Box>
       



           
      
       </div>
      
  )
}

export default CarManagement;