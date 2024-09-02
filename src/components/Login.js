import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure this is correctly pointing to your firebase.js file
import { signInWithEmailAndPassword } from 'firebase/auth'; // Correct import
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use signInWithEmailAndPassword correctly with the auth instance
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home or desired route upon successful login
    } catch (err) {
      // Handle specific Firebase error codes
      if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Login'
                  )}
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
