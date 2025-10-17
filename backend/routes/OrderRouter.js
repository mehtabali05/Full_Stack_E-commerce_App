import express from "express"
import bodyParser from "body-parser";
import { authUser } from './../middlewares/authUser.js';
import { createCheckoutSessionController, deleteFailedOrder, getAllOrders, getUserOrders,placeOrder, stripeWebhookHandler } from "../controllers/OrderController.js";
import { authAdmin } from './../middlewares/authAdmin.js';

const orderRouter = express.Router();

orderRouter.post("/webhook",bodyParser.raw({ type: "application/json" }), stripeWebhookHandler);
orderRouter.post("/place-order", authUser, placeOrder);  
orderRouter.post("/create-checkout-session", authUser,createCheckoutSessionController);
orderRouter.get("/user",authUser,getUserOrders); 
orderRouter.get("/admin",authAdmin,getAllOrders); 
orderRouter.delete("/delete-failed/:orderId", deleteFailedOrder);
export default orderRouter;  