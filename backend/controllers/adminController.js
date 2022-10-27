import { UserModel } from "../models/UserModel.js";
import { jwtKeySecret, localServerURL } from "../config/index.js";
import jwt from "jsonwebtoken";
import { FoodModel } from "../models/FoodModel.js";

export const adminController = {
  login: async (req, res) => {
    try {
      const { password } = req.body;
      if (password === process.env.APP_ADMIN_PASSWORD) {
        const token = jwt.sign(
          { username: "admin", role: "admin" },
          jwtKeySecret,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          message: "Vous êtes connecté en tant qu'administrateur.",
          token,
        });
      } else {
        res.status(401).json({ message: "Mot de passe incorrect." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  // users admin functions
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteOneUser: async (req, res) => {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      const users = await UserModel.find();
      res
        .status(200)
        .json({ message: "L'utilisateur a bien été supprimé !", users });
    } catch (error) {
      console.log(error);
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  //   foods admin functions
  getFoods: async (req, res) => {
    try {
      const foods = await FoodModel.find();
      res.status(200).json(foods);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  addOneFood: async (req, res) => {
    try {
      const food = new FoodModel({
        name: req.body.name,
        base: req.body.base,
        ingredients: req.body.ingredients,
        price: req.body.price,
        quantity: req.body.quantity,
        url: `${localServerURL}/images/${req.body.alias}`,
      });
      await food.save();
      const foods = await FoodModel.find();
      res
        .status(200)
        .json({ message: `${req.body.name} a bien été ajouté !`, foods });
    } catch (error) {
      console.log(error);
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  deleteOneFood: async (req, res) => {
    try {
      await FoodModel.findByIdAndDelete(req.params.id);
      const foods = await FoodModel.find();
      res
        .status(200)
        .json({ message: "Le produit a bien été supprimé !", foods });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  updateOneFood: async (req, res) => {
    try {
      await FoodModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      const foods = await FoodModel.find();

      res
        .status(200)
        .json({ message: "Le produit a bien été modifié !", foods });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  },
};
