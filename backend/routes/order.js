import express from "express";
import { orderController } from "../controllers/orderController.js";
// import { uploadImage } from "../middlewares/uploadImage.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/getAll", auth.checkUser, orderController.getAll);
// router.get("/getOne", auth.checkUser, orderController.getOne);
router.post("/addOne", auth.checkUser, orderController.addOne);
router.get("/getUserOrders", auth.checkUser, orderController.getUserOrders);

export default router;
