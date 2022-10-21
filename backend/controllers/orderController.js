import { ChartModel } from "../models/ChartModel.js";
import { OrderModel } from "../models/OrderModel.js";

export const orderController = {
  addOne: async (req, res) => {
    try {
      const userCart = await ChartModel.findOne({
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
        await ChartModel.deleteOne({
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
};
