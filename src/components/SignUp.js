import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Ensure correct path
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Correct import for modular SDK
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 'Weak';
    if (password.length >= 8) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
        strength = 'Strong';
      } else if (hasUpperCase || hasLowerCase || hasNumbers || hasSpecialChar) {
        strength = 'Medium';
      }
    }
    setPasswordStrength(strength);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength === 'Weak') {
      setError('Password is too weak');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to the home page or another page after successful sign-up
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please sign in or use another email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address. Please check and try again.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(`Failed to create account: ${err.message}`);
      }
      console.error('Error during sign-up:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            required
          />
          {password && (
            <small className="form-text">
              Password strength: <strong>{passwordStrength}</strong>
            </small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default SignUp;
