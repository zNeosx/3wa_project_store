import { ChartModel } from "../models/ChartModel.js";
import { FoodModel } from "../models/FoodModel.js";

export const chartController = {
  getOne: async (req, res) => {
    try {
      const chart = await ChartModel.findOne(
        {
          userId: req.session.user._id,
        },
        {
          foods: true,
        }
      ).populate("foods.food");
      res.status(200).json(chart);
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: error.errors });
    }
  },
  addOne: async (req, res) => {
    try {
      const userChart = await ChartModel.findOne({
        userId: req.session.user._id,
      });
      if (userChart) {
        const verifyFoodInChart = await ChartModel.findOne({
          userId: req.session.user._id,
          "foods.food": req.body.foodId,
        });
        if (verifyFoodInChart) {
          await ChartModel.updateOne(
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
          res.status(200).json({ message: "Quantité mise à jour" });
        } else {
          await ChartModel.updateOne(
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
          res.status(200).json({ message: "Produit ajouté au panier" });
        }
      } else {
        const chart = new ChartModel({
          userId: req.session.user._id,
          foods: [
            {
              food: req.body.foodId,
              quantity: 1,
            },
          ],
        });
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
        await chart.save();
        res.status(200).json(chart);
      }
      //   res.status(201).json({ chart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteOne: async (req, res) => {
    try {
      const food = await FoodModel.findOne(
        {
          _id: req.body.foodId,
        },
        {
          name: 1,
        }
      );
      //   const foodChartQuantity = await ChartModel.findOne(
      //     {
      //       userId: req.session.user._id,
      //       "foods.food": req.body.foodId,
      //     },
      //     {
      //       "foods.quantity": 1,
      //     }
      //   );
      //   console.log(foodChartQuantity);
      await ChartModel.updateOne(
        {
          userId: req.session.user._id,
        },
        {
          $pull: {
            foods: {
              food: req.body.foodId,
            },
          },
        }
      );
      //   await FoodModel.updateOne(
      //     {
      //       _id: req.body.foodId,
      //     },
      //     {
      //       $inc: {
      //         quantity: foodChartQuantity.quantity,
      //       },
      //     }
      //   );

      res
        .status(200)
        .json({ message: `${food.name} a bien été supprimé du panier` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
  incrementOne: async (req, res) => {
    try {
      await ChartModel.updateOne(
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
      res.status(200).json({ message: "Quantité incrémentée" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  decrementOne: async (req, res) => {
    try {
      await ChartModel.updateOne(
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
      res.status(200).json({ message: "Quantité décrémentée" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
};
