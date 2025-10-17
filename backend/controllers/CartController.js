import User from "../models/UserModel.js";

export const updateCart = async (req,res) => {
    try {
        const userId = req.user;
        const {cart} = req.body;

        const updatedCart = await User.findByIdAndUpdate(userId,{cartItems: cart},{new:true});
        res.status(200).json({
            success: true,
            message: "Cart Updated Successfully",
            updatedCart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message 
        })
    }
}