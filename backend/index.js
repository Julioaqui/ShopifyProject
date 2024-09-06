const express = require("express");
const Connection = require("./src/db");
const userController = require("./src/controller/user.controller");
const productController = require("./src/controller/product.controller");
const authMiddleware = require("./src/middleware/auth");
const cors = require("cors");

    
const app = express();

// Middleware
app.use(cors());
app.use(express.json());   // Converts json into object




app.use("/user", userController)
app.use("/product", authMiddleware, productController)

app.listen("3000", ()=>{
    Connection()
    console.log("Server is running on port 3000");
});