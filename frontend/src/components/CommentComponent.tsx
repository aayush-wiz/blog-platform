import type { Comment } from '../types';

interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <p className="text-gray-800">{comment.content}</p>
      <p className="text-sm text-gray-500">
        By {comment.author.username} on{' '}
        {new Date(comment.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CommentComponent;