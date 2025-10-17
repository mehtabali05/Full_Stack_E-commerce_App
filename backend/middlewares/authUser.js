import  jwt  from 'jsonwebtoken';
export const authUser = (req,res,next) => {
    try {
        const {token} = req.cookies;
        // console.log("User Token ",token);
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log("Decoded user ",decoded);
        req.user = decoded.id;  
        next();
    } catch (error) {
        // console.log("Error in authUser middleware:",error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
              success: false,
              message: "Session expired. Please log in again.",
            });
        }
      
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Please log in again.",
        });
    }
}