const express = require("express");
const User = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/signup", async (req, res) => {        //Signup and callback function
    const { name, email, password, roles } = req.body;

    try {
        const hashedPassword = await bcrypt.hashSync(password, 10);

        await User.create({ name, email, password: hashedPassword, roles })

        res.status(201).json({ message: "User created successfully." })

    } catch (error) {
        console.log("Signup error: ", error.message);

        res.status(500).json({ status: false, message: "Something went wrong." })
    }
}
)

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        
        let user = await User.findOne({ email: email });

        if (!user)
            return res.status(404).json({ status: false, message: "Invalid user" })

        console.log("user", user)

        const token = jwt.sign({ userID: user._id }, "anjnesh123")

        return res.status(201).json({ status: true, token: token, data: user })

    } catch (error) {
        console.log("Login error", error.message);

        res.status(500).json({ status: false, message: "Something went wrong." })
    }
})

module.exports = router;