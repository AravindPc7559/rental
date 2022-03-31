const mongoose = require('mongoose')

const wishlist = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    carId:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

const WhishListSchema = mongoose.model('WhishListSchema',wishlist);


module.exports = WhishListSchema;