import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: "string",
    match: [
      /^[a-zA-Z0-9éèàç\s]+$/,
      "Le nom du vurger ne peut contenir que des lettres et des chiffres.",
    ],
    required: [true, "Veuillez entrer le nom du repas."],
  },
  base: {
    type: "string",
    match: [
      /^[a-zA-Zéèàç\s]+$/,
      "La base du burger ne peut contenir que des lettres.",
    ],
    required: [true, "Veuillez entrer la base du burger."],
  },
  ingredients: {
    type: String,
    match: [
      /^[a-zA-Z0-9éèàç\s,]+$/,
      "Les ingrédients ne peuvent contenir que des lettres",
    ],
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
