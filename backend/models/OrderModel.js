import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
  price: {
    type: "number",
    match: [/^[0-9]+$/i, "Le prix n'est pas valide."],
    required: [true, "Le prix de la commande est nécessaire."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
