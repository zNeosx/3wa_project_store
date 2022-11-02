import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "L'identifiant d'un utilisateur est attendu."],
  },
  foods: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: [true, "L'identifiant d'un produit est attendu."],
      },
      quantity: {
        type: "number",
        match: [/^[0-9]+$/i, "Veuillez entrer une quantité valide."],
        required: [true, "Veuillez entrer la quantité du repas."],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const CartModel = mongoose.model("Cart", CartSchema);
