import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { createCommentSchema } from "../utils/schemas";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const createComment = [
  validate(createCommentSchema),
  asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { content, postId } = req.body;
    const author = req.user?.userId;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const comment = new Comment({ content, author, post: postId });
    await comment.save();

    res.status(201).json(comment);
  }),
];

export const getCommentsByPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.query.postId as string;
    if (!postId) {
      res.status(400).json({ message: "postId is required" });
      return;
    }

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username"
    );
    res.json(comments);
  }
);
