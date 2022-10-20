import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import { jwtKeySecret } from "../config/index.js";
import { UserModel } from "../models/UserModel.js";

export const authController = {
  register: async (req, res) => {
    try {
      const user = new UserModel({
        ...req.body,
        password: crypto.SHA1(req.body.password).toString(),
      });
      await user.save();
      res.status(200).json(user);
    } catch (errors) {
      if (errors.keyPattern.username) {
        res.status(400).json({ errors: "Ce pseudo est déjà utilisé." });
      } else if (errors.keyPattern.email) {
        res.status(400).json({ errors: "Cet email est déjà utilisé." });
      } else {
        res.status(400).json({ errors: errors.errors });
      }
      console.log(errors);
    }
  },
  login: async (req, res) => {
    console.log(req.body);
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      if (user) {
        if (user.password === crypto.SHA1(req.body.password).toString()) {
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username,
              email: user.email,
              role: "user",
            },
            jwtKeySecret,
            { expiresIn: "24h" },
            (err, token) => {
              if (err) {
                res.status(400).json(err);
              }
              res.status(200).json({ token });
            }
          );
        } else {
          res.status(400).json({
            field: "password",
            message: "Le mot de passe est incorrect.",
          });
        }
      } else {
        res.status(400).json({
          field: "email",
          message: "Aucun compte lié à cet adresse email.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  },
};
