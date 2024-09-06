const mongoose = require("mongoose");

const Connection = async () =>{
    try {
        await mongoose.connect("mongodb+srv://anjneshfwd:anjnesh1123@cluster0.vq8ri.mongodb.net/practiceCollection");
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Connection Error: ", error )
    }
}

module.exports = Connection;