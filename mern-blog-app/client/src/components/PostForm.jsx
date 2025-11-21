import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, post, put, loading } = useApi();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    categories: []
  });
  
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    const data = await get('/categories');
    if (data) setCategories(data);
  };

  const fetchPost = async () => {
    const data = await get(`/posts/${id}`);
    if (data) {
      setFormData({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || ''
      });
      setSelectedCategories(data.categories.map(cat => cat._id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      categories: selectedCategories
    };

    const result = id 
      ? await put(`/posts/${id}`, postData)
      : await post('/posts', postData);

    if (result) {
      navigate('/');
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="post-form">
      <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
      
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label>Excerpt (Optional)</label>
          <textarea
            className="form-control"
            rows="3"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            rows="10"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label>Categories</label>
          <div className="categories-list">
            {categories.map(category => (
              <label key={category._id} className="category-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategoryToggle(category._id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
          </button>
          <button 
            type="button" 
            className="btn" 
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
