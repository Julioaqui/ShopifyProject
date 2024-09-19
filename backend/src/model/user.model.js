const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type : String,
        required : true,
        unique : true,
        // validate : {
        //     validator : function(v) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        //     },
        //     message : props => `${props.value} is not a valid email!`
        // }
    },
    password: String,
    roles: { type: String, default: "user" },
}, {
    timestamps: true,
    versionKey: false,
    }
)

module.exports = mongoose.model("user", userSchema);

