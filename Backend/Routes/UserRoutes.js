const express = require("express");
const router = express.Router()
const {RegisterUser,loginUser,getCarData, otpnumber , otpvalidate,GetSingleCar,postingcomment , gettingreviews , deletecomment , dataTowishlist,search,lowtohigh , hightolow} = require('../Controllers/UserController')



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


module.exports = router;