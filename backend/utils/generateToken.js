import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res,userId)=>{
    const token =  jwt.sign({
        id:userId},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
 
    // Set JWT as a secure cookie 
    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    return token;
}