import  jwt  from 'jsonwebtoken';
import validator from 'validator';
export const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        // console.log("Login body",req.body);
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2. Email format validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            if (!process.env.JWT_SECRET) {
                // console.error("JWT_SECRET is not defined in environment variables");
                return res.status(500).json({
                  success: false,
                  message: "Server misconfiguration",
                });
            }    

            const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1d"});

            res.cookie("adminToken",token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge : 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: "Login Successful",
                admin: true
            });
         }else{
            return res.status(401).json({
                success: false,
                message: "Email or password incorrect"
            });
         }
    } catch (error) {
        // console.error("Error during admin Login",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const adminCheckAuth = async(req,res) => {
    try {
        res.status(200).json({
            success: true, 
            admin: true
        });
    } catch (error) {
        // console.error("Error during admin Check Auth",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const adminLogout = async (req,res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        // console.error("Error during admin Logout",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}