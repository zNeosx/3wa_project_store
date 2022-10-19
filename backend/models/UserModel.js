import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: [true, "Veuillez entrer votre nom."],
    match: [/^[a-zA-Z]+$/i, "Veuillez entrer un nom valide."],
  },
  firstname: {
    type: String,
    required: [true, "Veuillez entrer votre prénom."],
    match: [/^[a-zA-Z]+$/i, "Veuillez entrer un prénom valide."],
  },
  username: {
    type: String,
    required: [true, "Veuillez entrer votre nom d'utilisateur."],
    match: [/^[a-zA-Z0-9._-]+$/i, "Veuillez entrer un nom d'utilisateur valide."],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Veuillez entrer votre email."],
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Veuillez entrer un email valide.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Veuillez entrer votre mot de passe."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
