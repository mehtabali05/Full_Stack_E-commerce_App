import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    userId : {
        type: String,
        required: true,
    },
    fullName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    street : {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    state : {
        type: String,
        required: true,
    },
    postalCode : {
        type: Number,
        required: true,
    },
    country : {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String,
        required: true,
    },
})

const Address = mongoose.model("Address",addressSchema);

export default Address;