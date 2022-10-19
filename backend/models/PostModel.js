import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: [true, "Veuillez entrer le nom de la publication."],
  },
  description: {
    type: String,
    required: [true, "Veuillez entrer la description de la publication."],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "L'identifiant d'un utilisateur est attendu."],
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

export const PostModel = mongoose.model("Post", PostSchema);
