import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './hooks/useApi';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

function App() {
  return (
    <ApiProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/create" element={<PostForm />} />
              <Route path="/posts/edit/:id" element={<PostForm />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;
