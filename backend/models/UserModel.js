import mongoose from "mongoose";
// import { trim } from "validator";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true 
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    cartItems: {
        type: Object,
        default: {},
    }
},{timeStamp:true,minimize:false})

const User = mongoose.model("User",userSchema);

export default User;