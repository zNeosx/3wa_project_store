import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Veuillez entrer le nom du repas."],
  },
  category: {
    type: String,
    enum: ["Burger", "Pizza", "Pasta", "Salad", "Dessert", "Drink"],
    required: [true, "Veuillez entrer la catégorie du repas."],
  },
  price: {
    type: "number",
    match: [/^[0-9]+$/i, "Veuillez entrer un prix valide."],
    required: [true, "Veuillez entrer le prix du repas."],
  },
  quantity: {
    type: "number",
    match: [/^[0-9]+$/i, "Veuillez entrer une quantité valide."],
    required: [true, "Veuillez entrer la quantité du repas."],
  },
  url: {
    type: "string",
    required: [true, "L'url de l'image n'a pas pu être générée."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FoodModel = mongoose.model("Food", FoodSchema);
