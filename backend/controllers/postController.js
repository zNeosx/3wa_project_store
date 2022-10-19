import { PostModel } from "../models/PostModel.js";

export const postController = {
  getAll: async (req, res) => {
    try {
      const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .populate("userId", { password: 0 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getPostsUser: async (req, res) => {
    try {
      const posts = await PostModel.find({ userId: req.session.user.id })
        .sort({
          createdAt: -1,
        })
        .populate("userId", { password: 0 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  addOne: async (req, res) => {
    try {
      const post = new PostModel({ ...req.body, userId: req.session.user.id });
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  },
  deleteOne: async (req, res) => {
    try {
      await PostModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOne: async (req, res) => {
    console.log("update");
    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(post);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  },
};
