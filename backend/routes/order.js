import express from "express";
import { orderController } from "../controllers/orderController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addOne", auth.checkUser, orderController.addOne);
router.get("/getUserOrders", auth.checkUser, orderController.getUserOrders);

export default router;
