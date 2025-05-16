import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getCommentsByPost } from "../services/api";
import type { Post, Comment } from "../types";
import CommentComponent from "../components/CommentComponent";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (!id) return;
      try {
        const [postData, commentsData] = await Promise.all([
          getPostById(id),
          getCommentsByPost(id),
        ]);
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch post/comments:", error);
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!post) return <div className="text-center p-4">Post not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        By {post.author.username} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <h3 className="text-xl font-bold mt-6 mb-2">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentComponent key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
