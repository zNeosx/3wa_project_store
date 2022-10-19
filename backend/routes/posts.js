import express from "express";
import { postController } from "../controllers/postController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getAll", auth.checkUser, postController.getAll);
router.get("/getPostsUser", auth.checkUser, postController.getPostsUser);
router.get("/getOne/:id", auth.checkUser, postController.getOne);
router.post("/addOne", auth.checkUser, postController.addOne);
router.delete("/deleteOne/:id", auth.checkUser, postController.deleteOne);
router.patch("/updateOne/:id", auth.checkUser, postController.updateOne);

export default router;
