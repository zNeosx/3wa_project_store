import express from "express";
import { foodController } from "../controllers/foodController.js";
import { uploadImage } from "../middlewares/uploadImage.js";

const router = express.Router();

router.post("/addOne", uploadImage.single("image"), foodController.addOne);
router.get("/getAll", foodController.getAll);

export default router;
