import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { get, loading, error } = useApi();

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    const data = await get(`/posts?page=${currentPage}&limit=5`);
    if (data) {
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    }
  };

  if (loading && posts.length === 0) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h1>Latest Posts</h1>
        <Link to="/posts/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {posts.map(post => (
        <div key={post._id} className="card post-card">
          <h2>
            <Link to={`/posts/${post._id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          <p className="post-excerpt">
            {post.excerpt || post.content.substring(0, 200)}...
          </p>
          <div className="post-meta">
            <span>By {post.author?.username}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            {post.categories && post.categories.length > 0 && (
              <div className="post-categories">
                {post.categories.map(cat => (
                  <span key={cat._id} className="category-tag">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {posts.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
