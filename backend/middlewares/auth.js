import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { jwtKeySecret } from "../config/index.js";

export const auth = {
  checkUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, jwtKeySecret, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(401).json({ message: err.message });
        } else {
          //   console.log(decodedToken);
          let user = await UserModel.findById(decodedToken.id);
          req.session.user = {
            id: user._id,
            email: user.email,
            username: user.username,
          };
          next();
        }
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};
