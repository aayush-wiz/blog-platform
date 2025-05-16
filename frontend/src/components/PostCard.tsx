import { Link } from "react-router-dom";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
      <p className="text-sm text-gray-500">
        By {post.author.username} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
