import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, del, loading, error } = useApi();
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const data = await get(`/posts/${id}`);
    if (data) setPost(data);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = await del(`/posts/${id}`);
      if (success) {
        navigate('/');
      }
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-detail">
      <article className="card">
        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-actions">
            <Link to={`/posts/edit/${post._id}`} className="btn">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>

        <div className="post-meta">
          <span>By {post.author?.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="post-categories">
            {post.categories.map(category => (
              <span key={category._id} className="category-tag">
                {category.name}
              </span>
            ))}
          </div>
        )}

        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <div className="post-navigation">
        <Link to="/" className="btn">
          ← Back to Posts
        </Link>
      </div>
    </div>
  );
}

export default PostDetail;
