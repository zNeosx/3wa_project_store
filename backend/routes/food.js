import express from "express";
import { foodController } from "../controllers/foodController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/init", foodController.init);
router.post("/addOne", auth.checkUser, foodController.addOne);
router.get("/getAll", auth.checkUser, foodController.getAll);
router.get("/getOne/:id", auth.checkUser, foodController.getOne);
router.delete("/deleteOne/:id", auth.checkUser, foodController.deleteOne);

export default router;
