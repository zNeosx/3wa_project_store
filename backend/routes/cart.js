import express from "express";
import { cartController } from "../controllers/cartController.js";
// import { uploadImage } from "../middlewares/uploadImage.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getOne", auth.checkUser, cartController.getOne);
router.post("/addOne", auth.checkUser, cartController.addOne);
router.patch("/incrementOne", auth.checkUser, cartController.incrementOne);
router.patch("/decrementOne", auth.checkUser, cartController.decrementOne);
router.delete(
  "/deleteFoodFromCart/:foodId",
  auth.checkUser,
  cartController.deleteOne
);
// router.get("/getAll", chartController.getAll);
// router.get("/getOne/:id", chartController.getOne);

export default router;
