import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { createPostSchema } from "../utils/schemas";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const createPost = [
  validate(createPostSchema),
  asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const author = req.user?.userId;

    const post = new Post({ title, content, author });
    await post.save();

    res.status(201).json(post);
  }),
];

export const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  }
);

export const getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  }
);

export const updatePost = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.author.toString() !== req.user?.userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json(post);
  }
);

export const deletePost = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.author.toString() !== req.user?.userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  }
);
