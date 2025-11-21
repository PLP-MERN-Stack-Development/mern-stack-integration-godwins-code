import { useState, useContext, createContext } from 'react';

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiRequest = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const get = (url) => apiRequest(url);
  const post = (url, data) => apiRequest(url, { method: 'POST', body: JSON.stringify(data) });
  const put = (url, data) => apiRequest(url, { method: 'PUT', body: JSON.stringify(data) });
  const del = (url) => apiRequest(url, { method: 'DELETE' });

  return (
    <ApiContext.Provider value={{ get, post, put, del, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
