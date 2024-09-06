const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    title : String,
    price : Number,
    description : String,
    gender: String,
    image : String,
    quantity : Number
},{
    timeseries : true,
    versionKey : false,
})

module.exports = mongoose.model("product", productSchema);