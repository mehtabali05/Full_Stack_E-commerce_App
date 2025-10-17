import express from "express"
import { checkAuth, emailSendController, login,logoutUser, passwordChangeController, signup } from './../controllers/UserController.js';
import { authUser } from './../middlewares/authUser.js';
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login); 
userRouter.get("/is-auth",authUser,checkAuth);  
userRouter.post("/logout",logoutUser);

userRouter.post("/email-send",emailSendController);
userRouter.post("/change-password",passwordChangeController);

export default userRouter;