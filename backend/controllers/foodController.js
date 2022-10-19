import { FoodModel } from "../models/FoodModel.js";

export const foodController = {
  //   init: async (_, res) => {
  //     // const foodStateToInit = [
  //     //   {
  //     //     name: "Burger",
  //     //     category: "Burger",
  //     //     price: 10,
  //     //     quantity: 10,
  //     //   },
  //     //   {
  //     //     name: "Pizza",
  //     //     category: "Pizza",
  //     //     price: 10,
  //     //     quantity: 10,
  //     //   },
  //     //   {
  //     //     name: "Pasta",
  //     //     category: "Pasta",
  //     //     price: 10,
  //     //     quantity: 10,
  //     //   },
  //     //   {
  //     //     name: "Salad",
  //     //     category: "Salad",
  //     //     price: 10,
  //     //     quantity: 10,
  //     //   },
  //     //   {
  //     //     name: "Dessert",
  //     //     category: "Dessert",
  //     //     price: 10,
  //     //     quantity: 10,
  //     //   }
  //     // ];
  //     try {
  //       const food = new FoodModel();
  //       await food.save();
  //       res.status(200).json(food);
  //     } catch ({ errors }) {
  //       res.status(400).json(errors);
  //     }
  //   },
  addOne: async (req, res) => {
    try {
      const food = new FoodModel({
        ...req.body,
        url:
          req.protocol +
          "://" +
          req.get("host") +
          "/images/" +
          req.file.filename,
      });
      await food.save();
      res.status(200).json(food);
    } catch ({ errors }) {
      res.status(400).json(errors);
    }
  },
  getAll: async (req, res) => {
    try {
      const food = await FoodModel.find();
      res.status(200).json(food);
    } catch ({ errors }) {
      res.status(400).json(errors);
    }
  },
};
