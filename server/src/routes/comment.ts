import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/commentController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post("/", authMiddleware, createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 *       400:
 *         description: Invalid postId
 */
router.get("/", getCommentsByPost);

export default router;
