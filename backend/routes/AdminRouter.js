import express from "express"
import { adminCheckAuth, adminLogin, adminLogout } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/authAdmin.js";
const adminRouter = express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/is-auth",authAdmin,adminCheckAuth);
adminRouter.get("/logout",adminLogout);

export default adminRouter; 