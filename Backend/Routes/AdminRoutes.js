const express = require('express')
const Adminrouter = express.Router();
const {Adminlogin,AddCarRoute,deletecar,getAllCarDeatails,UpdateCarData , userManagement ,userManagementUpdate , usermanagementUpdateUnblock ,addDistrict , getdistrictData , deleteDistrict , couponmanagement , getcoupon ,deletecoupon } = require('../Controllers/AdminController.js')


Adminrouter.route('/adminlogin').post(Adminlogin)

Adminrouter.route('/addcar').post(AddCarRoute)

Adminrouter.route('/deletecar').post(deletecar)


Adminrouter.route('/getallcardetails/:id').get(getAllCarDeatails)

Adminrouter.route('/updatecardata').patch(UpdateCarData)

Adminrouter.route('/usermanagement').get(userManagement)

Adminrouter.route('/usermanagementUpdate/:id').patch(userManagementUpdate)

Adminrouter.route('/usermanagementUpdateUnblock/:id').patch(usermanagementUpdateUnblock)

Adminrouter.route('/addDistrict').post(addDistrict)

Adminrouter.route('/getdistrictData').get(getdistrictData)

Adminrouter.route('/deleteDistrict').post(deleteDistrict)

Adminrouter.route('/couponmanagement').post(couponmanagement)

Adminrouter.route('/getcoupon').get(getcoupon)

Adminrouter.route('/deletecoupon/:id').post(deletecoupon)

module.exports =  Adminrouter;