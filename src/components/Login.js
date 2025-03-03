import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('testuser'); // Default username
  const [password, setPassword] = useState('testpassword'); // Default password
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only navigate if the user is not logged in already
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard'); // This will not loop thanks to useEffect dependencies
    }
  }, [navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://touristguideproject-api.vercel.app/login', {
        username,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [username, password, isSubmitting, navigate]);

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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
