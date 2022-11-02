import { FoodModel } from "../models/FoodModel.js";
import { localServerURL } from "../config/index.js";

const initFoodState = [
  {
    name: "Bacon Cheese Burger",
    base: "Boeuf",
    ingredients:
      "oignons, origan, bacon, fromage cheddar, boeuf, ketchup, moutarde, salade verte",
    price: 10.99,
    quantity: 25,
    alias: "bacon-cheese-burger.jpg",
  },
  {
    name: "Black Burger",
    base: "Boeuf",
    ingredients:
      "oignons, origan, fromage emmental, fromage cheddar, boeuf, tomates, sauce barbecue, salade verte",
    price: 10.99,
    quantity: 25,
    alias: "black-burger.jpg",
  },
  {
    name: "Cirspy Burger",
    base: "Poulet",
    ingredients: "cripsy poulet, salade verte, tomates",
    price: 10.99,
    quantity: 25,
    alias: "crispy-chicken-burger.jpg",
  },
  {
    name: "Double Bacon Cheese Burger",
    base: "Boeuf",
    ingredients:
      "oignons, bacon, fromage cheddar, boeuf, salade verte, tomates, mayonnaise",
    price: 10.99,
    quantity: 25,
    alias: "double-bacon-cheeseburger.jpg",
  },
  {
    name: "Double Steak Burger",
    base: "Boeuf",
    ingredients:
      "oignons, cornichons, fromage cheddar, boeuf x2, salade verte, tomates",
    price: 10.99,
    quantity: 25,
    alias: "double-steak-burger.jpg",
  },
  {
    name: "Méga Burger",
    base: "Poulet",
    ingredients:
      "cornichons, fromage cheddar, poulet, salade verte, mayonnaise",
    price: 10.99,
    quantity: 25,
    alias: "mega-chicken-burger.png",
  },
  {
    name: "Spécial Oeuf Burger",
    base: "Boeuf",
    ingredients:
      "oignons, oeuf, fromage cheddar, boeuf, salade verte, mayonnaise",
    price: 10.99,
    quantity: 25,
    alias: "special-egg-burger.jpg",
  },
  {
    name: "Special Grill Burger",
    base: "Boeuf",
    ingredients:
      "oignons, fromage emmental, boeuf x3, salade verte, tomates, mayonnaise",
    price: 10.99,
    quantity: 25,
    alias: "special-grill-burger.png",
  },
];

export const foodController = {
  init: async (_, res) => {
    try {
      initFoodState.forEach(async (element) => {
        const food = new FoodModel({
          name: element.name,
          base: element.base,
          ingredients: element.ingredients,
          price: element.price,
          quantity: element.quantity,
          url: `${localServerURL}/images/${element.alias}`,
        });
        await food.save();
      });
      res.status(200).json({ message: "Tous les aliments ont été ajoutés" });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  addOne: async (req, res) => {
    try {
      const food = new FoodModel({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        url: `${localServerURL}/images/${req.body.alias}`,
      });
      await food.save();
      res.status(200).json(food);
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  getAll: async (req, res) => {
    try {
      const foods = await FoodModel.find();
      res.status(200).json(foods);
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  getOne: async (req, res) => {
    try {
      const food = await FoodModel.findById(req.params.id);
      res.status(200).json(food);
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
  deleteOne: async (req, res) => {
    try {
      await FoodModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Le produit a bien été supprimé !" });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },
};
