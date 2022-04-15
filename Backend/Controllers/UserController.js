const User = require("../Model/UserModel/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Unitl/jwt");
const AddCar = require('../Model/CarModel/CarModel')
const Review = require('../Model/ProductReviewModel/ProductReview')
const districtSchema = require('../Model/DistrictModel/DistrictModel')
var nodemailer = require('nodemailer');
const Razorpay = require('razorpay')
const shortid = require("shortid");
const path = require("path");

var instance = new Razorpay({ key_id: process.env.RAZKEYID , key_secret:process.env.RAZSECRETKEY})

const serviceSID =  process.env.SERVICESID
const AccountSID = process.env.ACCOUNTSID
const AuthTOKEN  = process.env.AUTHTOKEN
const client = require('twilio')(AccountSID,AuthTOKEN)
const bcrypt = require("bcrypt");
const AppliedCoupon = require("../Model/ApplyCoupon/ApplyCoupon");
const CouponModel = require("../Model/Coupon/Coupon");
const Booking = require("../Model/Bookings/Bookings");

//user register

const RegisterUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    age,
    gender,
    address,
    district,
    password,
  } = req.body;

  const UserExist = await User.findOne({ email });

  if (UserExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    phone,
    age,
    gender,
    address,
    district,
    password,
    isBlock:false,
  });
  // console.log(req.body);
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      address: user.address,
      district: user.district,
      isBlock:user.isBlock,
      Token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("error occured");
  }
});

//user login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });
  
  if(user.isBlock){
    res.status(400)
    res.json({
      iserror:"ADMIN IS BLOCKED THIS USER"
    })

    
  }else{

  

  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      email: user.email,
      isBlock:user.isBlock,
      name: user.name,
      IsBlock:user.isBlock,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email OR Password Not matching");
  }
}
});


const getCarData = asyncHandler(async(req,res)=>{
  try {
    const data = await AddCar.find({})
    res.json({
      data
    })
  } catch (error) {
    console.log(error);
  }
})


// otp number entering and sending otp

const otpnumber = asyncHandler(async(req,res)=>{

  console.log(req.body.mobNumber);

  const phone = req.body.mobNumber
  // console.log(phone);

  const data = await User.findOne({phone})

  if(data){
    client.verify.services(serviceSID).verifications.create({
      to:`+91${phone}`,
      channel:"sms"
    })
    
  }else{
    console.log("not founded");
    res.status(400)
    throw new Error("Mobile Number not exist")
  }


})



const otpvalidate = asyncHandler(async(req,res)=>{
  const otp = req.body.otp
  const phone = req.body.mobNumber
  // console.log(phone);
  // console.log(otp);


  const data = await User.findOne({phone})

  // console.log(data);

  try {
    client.verify.services(serviceSID).verificationChecks.create({
      to:`+91${phone}`,
      code:otp
    }).then((response)=>{
      console.log(response);

    res.json({
      _id: data._id,
      email: data.email,
      isBlock:data.isBlock,
      name: data.name,
      IsBlock:data.isBlock,
      token: generateToken(data._id),
      res:response
    });
    })


    res.status(200)
  } catch (error) {
    res.status(400)
      console.log("error occured in the otp validation",error);
  }
})

const GetSingleCar = asyncHandler(async(req,res)=>{

    const id = req.params.id

    // console.log(id);

    const carData = await AddCar.findById(id)

    // console.log(carData);

    if(carData){
      res.status(200)
      res.json(carData)
    }else{
      res.json(400)
      res.send("Error happend when we try take a single car from the database..")
    }

})


const postingcomment = asyncHandler(async(req,res)=>{
  // console.log(req.body);
  const {userName , review , carId} = req.body

  // console.log(userName , review , carId);

  const reviewData = await Review.create({
      userName,
      review,
      carId
  })
  if(reviewData){
    res.status(200).json({
      id:reviewData._id,
      name:reviewData.userName,
      review:reviewData.review,
    })
  }else{
    res.status(400).send("error occured")
  }


})

const gettingreviews = asyncHandler(async(req,res)=>{
    const carId = req.body.carId

    const data = JSON.stringify(carId)

    const carData = await Review.find({data})

    if(carData){
      res.status(200).json({
        carId:carData.carId,
        carData
      })

  
    }else{
      res.status(400).send("error occured during commenting section")
    }
})


const deletecomment =  asyncHandler(async(req,res)=>{
  const _id = req.params.id

  const deleteData = await Review.findById({_id})
  await deleteData.remove()

  // console.log(deleteData);

})

const dataTowishlist = asyncHandler(async(req,res)=>{
  const carId = req.params.id
  const data = req.body.USERID


  // console.log(carId);
  // console.log(data);


  const user = await User.findById({"_id":data})
  await user.wishlist.push(carId)
  await user.save()


  // console.log(user);


  if(user){
    res.status(200).json({
      wishlist:user.wishlist
    })
  }
 
})

const getdatafromwishlist = asyncHandler(async(req,res)=>{


  const id = req.body.USERID

  // console.log(id);

  const user = await User.findById({"_id":id})

  if(user){
    res.status(200).json({
      wishlist:user.wishlist
    })
  }else{
    res.status(400).send("error occured while seaching user id in wishlist data")
  }

  console.log(user);
})


const search = asyncHandler(async(req,res)=>{
  // console.log(req.body.searchText);

  const brand = req.body.searchText

  const data = await AddCar.find({"brand":brand}).collation( { locale: 'en', strength: 2 } )

    if(data){
      res.status(200).json({
        data
      })
    }else{
      console.log("error occured while serching car");
    }
})

const lowtohigh = asyncHandler(async(req,res)=>{

    const sort = await AddCar.find({}).sort({"price":1})

    // console.log(sort);

    if(sort){
      res.status(200).json({
        sort
      })
    }else{
      res.status(400)
      console.log("error occured while sorting low to hign");
    }
})

const hightolow = asyncHandler(async(req,res)=>{
      const sorttwo  = await AddCar.find({}).sort({"price":-1})

      // console.log(sorttwo);


      if(sorttwo){
        res.status(200).json({
          sorttwo
        })
      }else{
        res.status(400)
        res.send("Error occured while sorting data in high to low")
      }
})


const getallwishlistdata = asyncHandler(async(req,res)=>{

  const id = req.body.USERID

  // console.log(id);

  const data = await User.findById({'_id':id}).populate(
    'wishlist',
    'imgUrl model brand'
  )

  if(data){
    res.json(data.wishlist)
  }else{
    res.status(400).send("error getting wislist id's in wishlist page")
  }
  
  // console.log(data);

})


const removefromwishlist = asyncHandler(async(req,res)=>{
  
  const userId = req.body.USERID
  const carId = req.params.id

  const user = await User.findById({"_id":userId})
  if(user){
    await user.wishlist.pull(carId)
    await user.save()
    res.json({
      message:"Deleted Successfully"
      
    })
  }

  // console.log(userId);
  // console.log(carId);
})

const getprofileuserdata = asyncHandler(async(req,res)=>{
  // console.log(req.params.id);
  const id = req.params.id

  const user = await User.findById({"_id":id})

  if(user){
    res.status(200).json({
      user
    })
  }else{
    res.status(400).send("error while getting data from database in profile")
  }

})


const userupdate = asyncHandler(async(req,res)=>{
  // console.log(req.body);
  const userId = req.params.id
  // console.log(userId);


  const data={
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender,
    district:req.body.district,
    age:req.body.age,
    address:req.body.address
  }

  // console.log(data);


  try {
    const carsData = await User.findByIdAndUpdate(userId,data,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  })

  res.status(200).json({message:"Data Updated"})

  } catch (error) {
      res.status(400).json({message:"Data Not Found"})
  }
})


const passwordreset = asyncHandler(async(req,res)=>{
  // console.log(req.params.id);
  const id = req.params.id
  const passwordText = req.body.password
  const saltRounds = 10;
 

  const Bcryptpassword = await bcrypt.hash(passwordText , saltRounds)

  console.log(Bcryptpassword);




  const password = {
    password:Bcryptpassword
  }


try {
  const data = await User.findByIdAndUpdate(id,password,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    message:"Password Reset Successfully"
  })
} catch (error) {
  res.status(400).json({
    message:"Password reset Failed"
  })
}

})

const getdistrict =  asyncHandler(async(req,res)=>{

  const Getdistrict = await districtSchema.find({})

//  console.log(Getdistrict);

  if(Getdistrict){
    res.status(200).json({
      Getdistrict
    })
  }else{
    res.status(400).json({
      message:"District Not Found!"
    })
  }

})


const searchdistrict = asyncHandler(async(req,res)=>{
  const location = req.body.place

  console.log(location);

  const data = await AddCar.find({"location":location}).collation( { locale: 'en', strength: 2 } )


    if(data){
      res.status(200).json({
        data
      })
    }else{
      res.status(400).json({
        message:"No Data is there"
      })
    }

  console.log(data);
})

const applycoupon = asyncHandler(async(req,res)=>{
  
  const userId = req.body.USERID
  const Code = req.body.CouponApply

  // console.log(userId , Code);

  const data = await AppliedCoupon.findOne({"CouponCode":Code,"UserId":userId})

  if(data){
    console.log("already exist");
    res.json({
      message:"You Have already applied this coupon"
    })
  }else{
    // await AppliedCoupon.create({"CouponCode":Code,"UserId":userId})
   const data =  await CouponModel.findOne({"CouponCode":Code})
    
   console.log(data);

   if(data){
    res.status(200).json({
      CouponCode:data.CouponCode,
      couponname:data.couponname,
      discount:data.discount,
      _id:data._id,
      message:"Coupon Applied Successfully"
    })
   }else{
     console.log("NO COUPON");
     res.json({
       message:"coupon already used"
     })
   }
  }
  


})

// const logo = asyncHandler(async(req,res)=>{
//   res.sendFile()
// })

const razorpay = asyncHandler(async(req,res)=>{
  const payment_capture = -1;
  const amount = 500;
  const currency = "INR";

  const option = {
    amount,
    currency,
    receipt:shortid.generate(),
    payment_capture,
  };


  try {
    const response = await instance.orders.create(option)
    console.log(response);
    res.status(200).json({
      id:response.id,
      currency:response.currency,
    })
  } catch (error) {
    console.log(error);
  }
})

const razorpaysuccess = asyncHandler(async(req,res)=>{
  // console.log(req.body);

  // console.log("enterd");

  const couponId = req.body.couponId;
  const couponCode = req.body.couponCode;
  const startData = req.body.start;
  const endData = req.body.end;
  const userId = req.body.USERID;
  const userName = req.body.USERNAME;
  const carName = req.body.carName;
  const amount = req.body.amount
  const carId = req.params.id
  const useremail = req.body.USEREMAIL
  // console.log(couponId , couponCode , userId );
  // console.log(startData , endData , userId , userName , carName , carId , amount);

try {
  
  if(couponId && couponCode ){
    const couponstore = await AppliedCoupon.create({'UserId':userId,'CouponCode':couponCode})
  }
  // console.log(couponstore);


  const BookingStore = await Booking.create({'carId':carId,'userId':userId,'username':userName,'carname':carName,'cancel':false,'complete':false,'startDate':startData,'endDate':endData,'PayedAmount':amount})

    console.log(BookingStore);


  // if(IncCount){
  //   const UpdateCount = await AddCar.updateOne()

  //   console.log(UpdateCount);
  // }

  // console.log(IncCount);
  if(BookingStore){
    const IncCount = await AddCar.findOneAndUpdate({"_id":carId},{$inc:{Bookingcount:1}})


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: 'roadsterofficialpvt@gmail.com',
      to: useremail,
      subject: "RoadSter Car Rental Booking Service",
      text: `Hello ${userName} Thank you for using roadster for your personal car rental service . Your have successfully booked ${carName} from our website . You can use the car from ${startData} to ${endData} Thank You For using ROADSTER CAR RENTAL PRIVATE LIMITED and have a great day!!`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
       
      } else {
        console.log('Email sent: ' + info.response);
        res.send("Email sented")
      }
    });
  }

  res.status(200).json({
    message:"Successfully Booked"
  })
} catch (error) {
  res.status(400).json({
    message:"Something wrong happend when we try to book.."
  })
}
  // console.log(BookingStore);

})


const bookingdata =asyncHandler(async(req,res)=>{
  // console.log(req.body.userId);

  const userId = req.body.userId

  const bookingData = await Booking.find({"userId":userId,"cancel":false,"complete":false})

  // console.log(bookingData);


  if(bookingData){
    res.status(200).json({
      bookingData
    })
  }else{
    res.status(400).json({
      message:"Error while fetching booking history"
    })
  }

})

const completedtrips = asyncHandler(async(req,res)=>{
  const userId = req.body.userId

  const bookingData = await Booking.find({"userId":userId,"complete":true})

  // console.log(bookingData);


  if(bookingData){
    res.status(200).json({
      bookingData
    })
  }else{
    res.status(400).json({
      message:"Error while fetching booking history"
    })
  }
})

const cancelledtrips = asyncHandler(async(req,res)=>{
  const userId = req.body.userId
  const carId = req.body.CardId

  // console.log(userId , carId);

  const bookingData = await Booking.find({"userId":userId,"cancel":true})

  // console.log(bookingData);


  if(bookingData){
    const IncCount = await AddCar.findOneAndUpdate({"_id":carId},{$inc:{Bookingcount:-1}})
    res.status(200).json({
      bookingData
    })
  }else{
    res.status(400).json({
      message:"Error while fetching booking history"
    })
  }
})

const cancel = asyncHandler(async(req,res)=>{
  console.log(req.params.id);

  const data ={
    "cancel":true
  }

  const id= req.params.id
  const cancelData = await Booking.findByIdAndUpdate(id ,data,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  if(cancelData){
    res.status(200).json({
      Message:"You have cancelled the Booking"
    })
  }else{
    res.status(400).json({
      message:"something went wrong"
    })
  }
})

const getcoupon  = asyncHandler(async(req,res)=>{
     
  // console.log(req.body);

  const userid = req.body.USERID
  const data = await CouponModel.find({})

  // const applycoupon = await AppliedCoupon.find({'UserId':userid})
  


  // console.log(applycoupon);



  if(data){
      res.status(200).json({
          data,
          message:"Showing Data Successfull"
      })
  }else{
      res.status(400).json({
          message:"Showing Data Failed..."
      })
  }
})

const paypal = asyncHandler(async(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID) 
})


const checkdate = asyncHandler(async(req,res)=>{
  // console.log(req.body.val);
  // console.log(req.body.val2);
  const carId = req.body.id
  const startDate= req.body.val;
  const EndDate = req.body.val2;

  const DateCheck = await Booking.find({"carId":carId,"startDate":startDate,"endDate":EndDate})

  console.log(DateCheck);

  if(DateCheck.length<1){
    res.status(200).json({
      message:"Car Available"
    })
  }else if(DateCheck.length>0){
    res.json({
      message:"Car Not Available For this Time Period"
    })
  }else{
    console.log("No Date");
  }
})


module.exports = { checkdate,cancelledtrips,RegisterUser, loginUser,getCarData , otpnumber , otpvalidate,GetSingleCar , postingcomment  , gettingreviews , deletecomment,dataTowishlist , search,lowtohigh , hightolow , getdatafromwishlist ,getallwishlistdata ,removefromwishlist , getprofileuserdata ,userupdate,passwordreset , getdistrict,searchdistrict , applycoupon ,razorpay ,razorpaysuccess ,bookingdata ,cancel ,getcoupon  ,paypal , completedtrips};
