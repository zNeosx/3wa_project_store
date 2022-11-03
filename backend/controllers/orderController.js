import { CartModel } from "../models/CartModel.js";
import { OrderModel } from "../models/OrderModel.js";

export const orderController = {
  addOne: async (req, res) => {
    try {
      const userCart = await CartModel.findOne({
        userId: req.session.user._id,
      });
      if (!userCart) {
        res.status(400).json({ errors: "Votre panier est vide." });
      } else {
        const newOrder = new OrderModel({
          userId: req.session.user._id,
          foods: userCart.foods,
          price: req.body.price,
        });
        await newOrder.save();
        await CartModel.deleteOne({
          userId: req.session.user._id,
        });
        res.status(200).json({
          message:
            "Commande confirmée. Vous allez être redirigé vers l'accueil.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: error.errors });
    }
  },
  getUserOrders: async (req, res) => {
    try {
      const orders = await OrderModel.find({
        userId: req.session.user._id,
      })
        .populate("foods.food")
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: error.errors });
    }
  },
};
