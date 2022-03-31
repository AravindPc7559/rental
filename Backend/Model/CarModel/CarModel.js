const mongoose = require('mongoose')

const CarModel = mongoose.Schema({
    Brand:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    FuelType:{
        type:String,
        required:true
    },
    RegNo:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Seats:{
        type:Number,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Mileage:{
        type:String,
        required:true
    },
    Register:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    // carImage:{
    //     type:String,
    //     required:true
    // },
    Url:{
        type:String,
        required:true
    }
},{
    timestamps: true
});


const Cars = mongoose.model('Cars',CarModel);

module.exports = Cars;