import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId : {
        type: String,
        required: true,
        ref: "User"
    },
    items : [
        {
            product : {
                type: String,
                required: true,
                ref: "Book"
            },
            quantity : {
                type: Number,
                required: true,
            },
        },
    ],
    amount : {
        type: Number,
        required: true,
    },
    address : {
        type: String,
        required: true,
        ref: "Address"
    },
    status : {
        type: String,
        default: "Order Placed",
    },
    paymentType : {
        type: String,
        required: true,
    },
    isPaid : {
        type: Boolean,
        required: true,
        default: false
    },
},{timestamps: true});

const Order = mongoose.model("Order",orderSchema);

export default Order;