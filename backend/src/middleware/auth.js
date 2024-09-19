const jwt = require("jsonwebtoken")
const User = require("../model/user.model")

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        var decoded = jwt.verify(token, "anjnesh123");

        if (!decoded)
            return res.status(404).json({ status: false, message: "Invalid Token" })
        console.log("Decoded Token: ", decoded)
        let user = await User.findOne({ _id: decoded.userID });
        // console.log("User: ", user)

        if (user) {
            next() 
            // console.log("Correct User")
        } else {
            res.status(404).json({ status: false, message: "You are not authorized" })
        }

        // console.log("token: ", token)
    } catch (error) {
        console.log("Authentication error: ", error.message);
        return res.status(500).send("Something went wrong")
    }
}

module.exports = authenticate;