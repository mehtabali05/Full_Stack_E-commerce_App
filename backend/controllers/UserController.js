import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import Otp from "../models/OtpModel.js";
import nodemailer from "nodemailer";

export const signup = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        // 2. Email format validation 
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        
        // 3. Password strength validation (at least 6 characters, include number)
        if (password.length < 6 || !/\d/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long and contain a number",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "user already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        generateTokenAndSetCookie(res, user._id);
 
        return res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user: {
                id:user._id,
                name:user.name,
                email: user.email
            },
        })
    } catch (error) {
        // console.error("Error during signup:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// Login User
export const login = async (req,res) => { 
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: " All fields are required"
            });
        }

        // 2. Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }  

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
    
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            });
        }

        generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            success: true,
            message: "User logged in Successfully",
            user:{
                id:user._id,
                name: user.name,
                email:user.email
            }
        })
    } catch (error) {
        // console.error("Error during Login:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
 

export const checkAuth = async (req,res) => {
    try {
        const userId = req.user;
        // console.log("User Check auth",req.user);
        const user = await User.findById(userId).select("-password");
        // console.log("User",user);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        // console.error("Error during User authentication:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
} 
  

export const logoutUser = (req,res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        // localStorage.removeItem("user");
        return res.status(200).json({
            success: true,
            message: "User Logged out successfully"
        })
    } catch (error) {
        // console.error("Error during Logout:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const emailSendController = async (req, res) => {
    try {

        const { email } = req.body;
        // console.log("Request body",req.body);
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        // 2. Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        } 

        const emailExists = await User.findOne({ email });
        if (!emailExists) {
            return res.status(400).json({
              success: false,
              message: "Email not registered",
            });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000);

        const otpData = new Otp({
            email,
            otp: otpCode,
            expireIn: Date.now() + 5 * 60 * 1000,
        });

        await otpData.save();

        mailer(otpCode, email);
        return res.status(200).json({
            success: true, 
            message: "OTP sent to your email",
        });
    } catch (error) {
        // console.error("Error during Sending Email:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const passwordChangeController = async (req, res) => {
    try {
        const { email, otp, confirmPassword } = req.body;
        const newPassword = confirmPassword;
        // console.log(req.body);
        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2. Email format validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        
        // 3. Password strength validation (at least 6 characters, include number)
        if (newPassword.length < 6 || !/\d/.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long and contain a number",
            });
        }

        const data = await Otp.findOne({ email, otp });
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        let currentTime = new Date().getTime();
        const diff = data.expireIn - currentTime;
        if (diff < 0) {
            await Otp.deleteMany({ email });
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            });
        }else{
            const user = await User.findOne({ email });
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Password changed successfully",
            }); 
        }
    } catch (error) {
        // console.error("Error during Changing Password:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
        
    }
}

const mailer = (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "mehtabali4505@gmail.com" ,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: "mehtabali4505@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, function(error,info){
        // if(error){
        //     console.error("Error sending email:",error);
        // }else{
        //     console.log("Email sent:",info.response);
        // }
    })
}; 

              