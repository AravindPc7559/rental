const mongoose = require('mongoose')

const CarModel = mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    fueltype:{
        type:String,
        required:true
    },
    RegNo:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    mileage:{
        type:String,
        required:true
    },
    register:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},{
    timestamps: true
});


const Cars = mongoose.model('Cars',CarModel);

module.exports = Cars;