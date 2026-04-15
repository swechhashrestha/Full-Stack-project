const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    image:{
        type:String,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        default:1,
    },


},
{timestamps:true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;