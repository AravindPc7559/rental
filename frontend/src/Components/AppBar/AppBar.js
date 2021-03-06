import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AnimatedText from 'react-animated-text-content';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate,Link } from 'react-router-dom';
import { Button } from '@mui/material';
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




const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));






function AppBarHeader(props) {

    const [logout,setLogout] = useState(false)
    const navigate = useNavigate();
    const [userId , setUserId] = useState()
    const [adminlogout,setAdminLogout] = useState(false)
    const loc = JSON.parse(localStorage.getItem('userInfo'))
    
   
    // console.log(loc.name);

    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    // 

    


    const data = () => {
      if(loc){
        setUserId(loc._id)
      }
    }

      //   Logout handling
      const logoutHandle = () =>{
        localStorage.removeItem('userInfo')
        setLogout(true)
        navigate('/')
        setOpen(false)
        
      }


    const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{zIndex:200}}
    >
  
      {loc ?
      <div>
      <MenuItem onClick={()=>navigate(`/profile/${userId}`)}>Profile</MenuItem>
      <MenuItem onClick={()=>navigate('/bookinghistory')}>Booking History</MenuItem>
      <MenuItem onClick={handleOpen}>Logout</MenuItem>
      </div>
      :
      <MenuItem onClick={()=>navigate('/login')}>Login</MenuItem>
      }

    </Menu>
  );

  const adminLogoutHandle = () => {
    localStorage.removeItem('Admin')
    setAdminLogout(true)
    navigate('/admin')
  }

     useEffect(()=>{
    console.log("rendered");
    },[logout,adminlogout])
  


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );


  useEffect(()=>{
    data()
  },[])



  return (
    
    <Box sx={{ flexGrow: 1,position:'fixed',top:0,left:0,right:0,zIndex:100}}>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          props.admin ?
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
            Are you sure want to Logout
          </Typography>
      <Box sx={{justifyContent:'center',display:'flex'}} >
      <Button onClick={adminLogoutHandle} >Yes</Button>
      <Button onClick={()=>setOpen(false)} >No</Button>
      </Box>
        </Box> :
       <Box sx={style}>
       <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
         Are you sure want to Logout
       </Typography>
   <Box sx={{justifyContent:'center',display:'flex'}} >
   <Button onClick={logoutHandle} >Yes</Button>
   <Button onClick={()=>setOpen(false)} >No</Button>
   </Box>
   </Box>
        }
            
      
      </Modal>



    <AppBar position="static" style={{backgroundColor:'#222222'}}>
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          // sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {
              props.admin ? null : <div style={{display:'flex'}} >
                <img src='https://cdn.dribbble.com/users/1732431/screenshots/4236759/800x600.png' style={{height:50}} alt='Roadsters Logo' />
                <Link to='/' style={{color:'white',textDecoration:'none'}} ><Typography  mt={1.5} ml={1} >ROADSTER</Typography></Link>
              </div>
          }
        </Typography>





        <Box sx={{ flexGrow: 1 }} />
          {
            loc && !props.admin ? 
            <div style={{marginRight:10}}>
            
            <Button sx={{color:'white'}} onClick={()=>navigate('/wishlist')}   >Wishlist</Button> </div>
              :
              null
          }

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      

      

          {
            loc && !props.admin ? 
            <div style={{marginRight:10 , marginTop:14}}>
            
            <h6 style={{color:'white'}} > Welcome {loc.name}</h6>
             </div>
              :
              null
          }

          {
            props.admin ? 
            <div style={{marginRight:10 , marginTop:14}}>
              {/* <h6> Welcome Admin</h6> */}
              <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
              }}
              animationType="blocks"
              interval={0.06}
              duration={0.8}
              tag="p"
              className="animated-paragraph"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              Welcome Admin
            </AnimatedText>
               </div>
               :
               null
          }

          
        {
            props.admin ?
            <Button variant='contained' onClick={handleOpen} >Logout</Button>
            :
          
            <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          
          
        }
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton >
        </Box>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
  </Box>    

  )
}

export default AppBarHeader