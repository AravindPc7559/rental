import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/LoginPage/Login'
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import NotFoundPage from './Pages/404Page/NotFoundPage';
import AddCars from './Pages/AddCars/AddCars';
import CarManagement from './Pages/CarManagement/CarManagement';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UserManagement from './Pages/AdminUsermanagement/UserManagement';
import ProductPage from './Pages/ProductPage/ProductPage';
import WishList from './Pages/Wishlist/WishList';
import DistrictManagement from './Pages/DistrictManagement/DistrictManagement';
import Profile from './Pages/Profile/Profile';
import BookingPage from './Pages/BookingPage/BookingPage';
import {Provider} from 'react-redux'
import store from './Redux/Store';
import CouponManagement from './Pages/CouponManagemnet/CouponManagement';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
      <BrowserRouter  >
      <Routes>
        <Route path='/admin/addcars' element={<AddCars/>} />
        <Route path='/productpage/:id' element={<ProductPage/>} />
        <Route path='/profile/:id'  element={<Profile/>} />
        <Route path='/admin/coupon'  element={<CouponManagement/>} />
        <Route path='/booking/:id' element={<BookingPage/>} />
        <Route path='/admin/usermanagement' element={<UserManagement/>} />
        <Route path='/admin/districtmanagement' element={<DistrictManagement/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/carManagement' element={<CarManagement/>} />
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admin/adminhomepage' element={<Admin/>} />
        <Route path='/' element={<User/>} />
        <Route path='/wishlist' element={<WishList/>} />
        <Route path='/login' element={<Login/>}  />
        <Route path='/register' element={<SignUp/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
