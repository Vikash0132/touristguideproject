import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
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
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("/map2.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '100%',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
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
      </form>
    </div>
  );
};

export default Login;
