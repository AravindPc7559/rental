const mongoose = require('mongoose')

const Applycoupon = mongoose.Schema({
    UserId:{
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

const AppliedCoupon = mongoose.model('AppliedCoupon',Applycoupon);

module.exports = AppliedCoupon;