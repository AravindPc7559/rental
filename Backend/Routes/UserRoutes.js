const express = require("express");
const router = express.Router()
const {RegisterUser,loginUser,getCarData, otpnumber , otpvalidate,GetSingleCar,postingcomment , gettingreviews , deletecomment , dataTowishlist,search,lowtohigh , hightolow,getdatafromwishlist ,getallwishlistdata ,removefromwishlist,getprofileuserdata , userupdate,passwordreset,getdistrict , searchdistrict , applycoupon ,razorpay ,razorpaysuccess , bookingdata , cancel,getcoupon} = require('../Controllers/UserController')



router.route('/signup').post(RegisterUser)  

router.route('/login').post(loginUser)

router.route('/getcarData').get(getCarData) 

router.route('/otpnumber').post(otpnumber)

router.route('/otpvalidate').post(otpvalidate)

router.route('/getsinglecar/:id').post(GetSingleCar)

router.route('/postingcomment').post(postingcomment)

router.route('/gettingreviews').post(gettingreviews)

router.route('/deletecomment/:id').post(deletecomment)

router.route('/dataTowishlist/:id').post(dataTowishlist)

router.route('/search').post(search)

router.route('/lowtohigh').get(lowtohigh)

router.route('/hightolow').get(hightolow)

router.route('/getdatafromwishlist').post(getdatafromwishlist)

router.route('/getallwishlistdata').post(getallwishlistdata)

router.route('/removefromwishlist/:id').post(removefromwishlist)

router.route('/getprofileuserdata/:id').get(getprofileuserdata)

router.route('/userupdate/:id').patch(userupdate)

router.route('/passwordreset/:id').patch(passwordreset)

router.route('/getdistrict').get(getdistrict)

router.route('/searchdistrict').post(searchdistrict)

router.route('/applycoupon').post(applycoupon)

router.route('/razorpay').post(razorpay)

router.route('/razorpaysuccess/:id').post(razorpaysuccess)

router.route('/bookingdata').post(bookingdata)

router.route('/cancel/:id').post(cancel)

router.route('/getcoupon').post(getcoupon)

module.exports = router;