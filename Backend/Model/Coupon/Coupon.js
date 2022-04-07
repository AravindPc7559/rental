const mongoose = require('mongoose')

const coupon = mongoose.Schema({
    couponname:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    CouponCode:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const CouponModel = mongoose.model('CouponModel',coupon);

module.exports = CouponModel;