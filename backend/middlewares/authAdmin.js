import  jwt from 'jsonwebtoken';
export const authAdmin = (req,res,next) => {
    try {
        const {adminToken} = req.cookies;
        // console.log("Admin token",adminToken);
        if(!adminToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        

        const decoded = jwt.verify(adminToken,process.env.JWT_SECRET);
        // console.log("Admin decoded",decoded);
        if(decoded.email === process.env.ADMIN_EMAIL){
            return next();
        }else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
    } catch (error) {
        // console.error("Error in authAdmin middleware:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}