import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MERN Blog
        </Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/posts/create" className="nav-link">New Post</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
