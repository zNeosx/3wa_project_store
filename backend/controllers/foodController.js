import { FoodModel } from "../models/FoodModel.js";
import { localServerURL } from "../config/index.js";

// const InitFoodState = [
//   {
//     name: "Spicy Burger",
//     category: "Burger",
//     price: 10.99,
//     quantity: 25,
//     alias: "spicy-burger.jpg",
//   },
//   {
//     name: "Cheese Burger",
//     category: "Burger",
//     price: 10.99,
//     quantity: 25,
//     alias: "cheese-burger.jpg",
//   },
//   {
//     name: "Bacon Burger",
//     category: "Burger",
//     price: 10.99,
//     quantity: 25,
//     alias: "bacon-burger.jpg",
//   },
//   {
//     name: "Fish Burger",
//     category: "Burger",
//     price: 10.99,
//     quantity: 25,
//     alias: "fish-burger.jpg",
//   },
//   {
//     name: "Chicken Burger",
//     category: "Burger",
//     price: 10.99,
//     quantity: 25,
//     alias: "chicken-burger.jpg",
//   },
//   {
//     name: "Long Burger",
//     category: "Burger",
//     price: 10.99,
//     quantity: 25,
//     alias: "long-burger.jpg",
//   },
//   {
//     name: "Pizza 3 Fromages",
//     category: "Pizza",
//     price: 12,
//     quantity: 25,
//     alias: "3-fromages.jpg",
//   },
//   {
//     name: "Pizza Pepperoni",
//     category: "Pizza",
//     price: 12,
//     quantity: 25,
//     alias: "peperoni-pizza.jpg",
//   },
//   {
//     name: "Pizza Spécial",
//     category: "Pizza",
//     price: 12,
//     quantity: 25,
//     alias: "special-pizza.jpg",
//   },
//   {
//     name: "Pizza Végétarienne",
//     category: "Pizza",
//     price: 12,
//     quantity: 25,
//     alias: "vegetarien-pizza.jpg",
//   },
//   {
//     name: "Fondant au chocolat",
//     category: "Dessert",
//     price: 3,
//     quantity: 25,
//     alias: "chocolate-fondant.jpg",
//   },
//   {
//     name: "Meringué",
//     category: "Dessert",
//     price: 3,
//     quantity: 25,
//     alias: "meringue.jpg",
//   },
//   {
//     name: "Macarons",
//     category: "Dessert",
//     price: 3,
//     quantity: 25,
//     alias: "macaroons.jpg",
//   },
//   {
//     name: "Flan fruits rouges",
//     category: "Dessert",
//     price: 3,
//     quantity: 25,
//     alias: "red-berry-flan.jpg",
//   },
//   {
//     name: "Crème Chantilly aux Fraises",
//     category: "Dessert",
//     price: 3,
//     quantity: 25,
//     alias: "strawberry-whipped-cream.jpg",
//   },
//   {
//     name: "Eau",
//     category: "Drink",
//     price: 2,
//     quantity: 25,
//     alias: "bottle-water.jpg",
//   },
//   {
//     name: "Coca Cola",
//     category: "Drink",
//     price: 2,
//     quantity: 25,
//     alias: "coca-cola.jpg",
//   },
//   {
//     name: "Thé Glacé",
//     category: "Drink",
//     price: 2,
//     quantity: 25,
//     alias: "icetea.jpg",
//   },
//   {
//     name: "Pepsi",
//     category: "Drink",
//     price: 2,
//     quantity: 25,
//     alias: "pepsi.jpg",
//   },
//   {
//     name: "Salade Poulet",
//     category: "Salad",
//     price: 8,
//     quantity: 25,
//     alias: "chicken-salad.jpg",
//   },
//   {
//     name: "Salade 4 Saisons",
//     category: "Salad",
//     price: 8,
//     quantity: 25,
//     alias: "four-seasons-salad.jpg",
//   },
//   {
//     name: "Salade de Tomates",
//     category: "Salad",
//     price: 8,
//     quantity: 25,
//     alias: "tomato-salad.jpg",
//   },
// ];

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
  // addOne: async (req, res) => {
  //   try {
  //     const food = new FoodModel({
  //       ...req.body,
  //       url:
  //         req.protocol +
  //         "://" +
  //         req.get("host") +
  //         "/images/" +
  //         req.file.filename,
  //     });
  //     await food.save();
  //     res.status(200).json(food);
  //   } catch ({ errors }) {
  //     res.status(400).json(errors);
  //   }
  // },
  getAll: async (req, res) => {
    try {
      const food = await FoodModel.find();
      res.status(200).json(food);
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
