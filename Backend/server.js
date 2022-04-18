const path = require('path')
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
require('dotenv').config()
var bodyParser = require('body-parser')
const userRoute = require('./Routes/UserRoutes')
const AdminRoute = require('./Routes/AdminRoutes.js')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 5000
const mongoDB = process.env.MONGODB_CONNECTION;


//database connection
mongoose.connect(mongoDB,()=>console.log("Database Connected.."))




//errror handling
const notFound  = (req,res,next)=>{
    const error  = new Error("Not Found");
    res.status(404);
    next(error);
}

const errorHandler = (err,req,res,next) => {
    console.error(err);
    const statusCode =  res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message
    })
};


//middlewares
app.use(morgan('dev'))
app.use(express.json({limit: "30mb",extended:true}))
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())



//router middleware
app.use('/api/user',userRoute)
app.use('/api/admin',AdminRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/build')));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.status(200).send("Hellow Everybody..asdas..");
    });
} 

app.use(notFound);
app.use(errorHandler);



app.listen(5000,()=>console.log(`Server running on ${port}`));
