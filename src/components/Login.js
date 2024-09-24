import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard', { replace: true }); // Ensure replace to prevent going back to login page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://touristguideproject-api.vercel.app/login', {
        username,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard', { replace: true });  // Redirect to dashboard after successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('There was an error logging in!');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
