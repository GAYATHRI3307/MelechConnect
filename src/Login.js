import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('electrician'); // changed from role
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, occupation }), // changed from role
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login successful!");

        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }

        if (occupation === "electrician") {
          navigate("/electrician-dashboard");
        } else {
          navigate("/mechanic-dashboard");
        }
      } else {
        alert(data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Error connecting to server.");
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const responseGoogle = (response) => {
    if (response.credential) {
      console.log('Google Login Success:', response);
      if (occupation === 'electrician') {
        navigate('/electrician-dashboard');
      } else {
        navigate('/mechanic-dashboard');
      }
    } else {
      console.log('Google Login Failed');
    }
  };

  return (
    <GoogleOAuthProvider clientId="650941295599-hv6stgavcpnf2mnad056r71smfqappkg.apps.googleusercontent.com">
      <div className="login-container">
        <h2>Login to MelechConnect</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={togglePasswordVisibility}>
                {passwordVisible ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Occupation:</label>
            <select value={occupation} onChange={(e) => setOccupation(e.target.value)} required>
              <option value="electrician">Electrician</option>
              <option value="mechanic">Mechanic</option>
            </select>
          </div>

          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} 
              />
              Remember Me
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <div className="signup-option">
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/SignUp')}
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Sign Up
            </span>
          </p>
        </div>

        <div className="google-login">
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={responseGoogle}
            useOneTap
            shape="pill"
            width="100%"
            text="continue_with_google"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
