import express from "express";
import { adminController } from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// admin auth
router.post("/login", adminController.login);

// users admin
router.get("/users/getAll", auth.checkAdmin, adminController.getUsers);
router.delete(
  "users//deleteOne/:id",
  auth.checkAdmin,
  adminController.deleteOneUser
);

// foods admin
router.post("/foods/addOne", auth.checkAdmin, adminController.addOneFood);
router.delete(
  "/foods/deleteOne/:id",
  auth.checkAdmin,
  adminController.deleteOneFood
);
// router.get("/users/:id", auth.checkAdmin, adminController.getUser);

export default router;
