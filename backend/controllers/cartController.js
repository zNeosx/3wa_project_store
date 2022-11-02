import { CartModel } from "../models/CartModel.js";
import { FoodModel } from "../models/FoodModel.js";

export const cartController = {
  getOne: async (req, res) => {
    try {
      const cart = await CartModel.findOne(
        {
          userId: req.session.user._id,
        },
        {
          foods: true,
        }
      ).populate("foods.food");
      if (!cart) {
        res.status(200).json({
          foods: [],
        });
      } else {
        if (cart.foods.length === 0) {
          await CartModel.deleteOne({
            userId: req.session.user._id,
          });
          res.status(200).json({
            foods: [],
          });
        } else {
          res.status(200).json(cart);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: error.errors });
    }
  },
  addOne: async (req, res) => {
    try {
      const userCart = await CartModel.findOne({
        userId: req.session.user._id,
      });
      if (!userCart) {
        const newCart = new CartModel({
          userId: req.session.user._id,
          foods: [
            {
              food: req.body.foodId,
              quantity: 1,
            },
          ],
        });
        await newCart.save();
        await FoodModel.updateOne(
          {
            _id: req.body.foodId,
          },
          {
            $inc: {
              quantity: -1,
            },
          }
        );
        const food = await FoodModel.findOne(
          {
            _id: req.body.foodId,
          },
          {
            name: 1,
          }
        );
        const cart = await CartModel.findOne(
          {
            userId: req.session.user._id,
          },
          {
            userId: false,
          }
        ).populate("foods.food");
        res
          .status(200)
          .json({ message: `${food.name} a bien été ajouté du panier`, cart });
      } else {
        await CartModel.updateOne(
          {
            userId: req.session.user._id,
          },
          {
            $push: {
              foods: {
                food: req.body.foodId,
                quantity: 1,
              },
            },
          }
        );
        await FoodModel.updateOne(
          {
            _id: req.body.foodId,
          },
          {
            $inc: {
              quantity: -1,
            },
          }
        );
        const food = await FoodModel.findOne(
          {
            _id: req.body.foodId,
          },
          {
            name: 1,
          }
        );
        const cart = await CartModel.findOne(
          {
            userId: req.session.user._id,
          },
          {
            userId: false,
          }
        ).populate("foods.food");
        res
          .status(200)
          .json({ message: `${food.name} a bien été ajouté du panier`, cart });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: error.errors });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const food = await FoodModel.findOne(
        {
          _id: req.params.foodId,
        },
        {
          name: 1,
        }
      );
      //   const foodChartQuantity = await CartModel.findOne(
      //     {
      //       userId: req.session.user._id,
      //       "foods.food": req.body.foodId,
      //     },
      //     {
      //       "foods.quantity": 1,
      //     }
      //   );
      //   console.log(foodChartQuantity);
      await CartModel.updateOne(
        {
          userId: req.session.user._id,
        },
        {
          $pull: {
            foods: {
              food: req.params.foodId,
            },
          },
        }
      );
      const cartUpdated = await CartModel.findOne(
        {
          userId: req.session.user._id,
        },
        {
          userId: false,
        }
      ).populate("foods.food");
      res.status(200).json({
        message: `${food.name} a bien été supprimé du panier`,
        cart: cartUpdated,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
  incrementOne: async (req, res) => {
    try {
      await CartModel.updateOne(
        {
          userId: req.session.user._id,
          "foods.food": req.body.foodId,
        },
        {
          $inc: {
            "foods.$.quantity": 1,
          },
        }
      );
      await FoodModel.updateOne(
        {
          _id: req.body.foodId,
        },
        {
          $inc: {
            quantity: -1,
          },
        }
      );
      const cart = await CartModel.findOne(
        {
          userId: req.session.user._id,
        },
        {
          userId: false,
        }
      ).populate("foods.food");
      res.status(200).json({ message: "Quantité incrémentée", cart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  decrementOne: async (req, res) => {
    try {
      await CartModel.updateOne(
        {
          userId: req.session.user._id,
          "foods.food": req.body.foodId,
        },
        {
          $inc: {
            "foods.$.quantity": -1,
          },
        }
      );
      await FoodModel.updateOne(
        {
          _id: req.body.foodId,
        },
        {
          $inc: {
            quantity: 1,
          },
        }
      );
      const cart = await CartModel.findOne(
        {
          userId: req.session.user._id,
        },
        {
          userId: false,
        }
      ).populate("foods.food");
      res.status(200).json({ message: "Quantité décrémentée", cart });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
};
