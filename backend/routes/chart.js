import express from "express";
import { chartController } from "../controllers/chartController.js";
// import { uploadImage } from "../middlewares/uploadImage.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getOne", auth.checkUser, chartController.getOne);
router.post("/addOne", auth.checkUser, chartController.addOne);
router.patch("/incrementOne", auth.checkUser, chartController.incrementOne);
router.patch("/decrementOne", auth.checkUser, chartController.decrementOne);
router.delete("/deleteOne", auth.checkUser, chartController.deleteOne);
// router.get("/getAll", chartController.getAll);
// router.get("/getOne/:id", chartController.getOne);

export default router;
