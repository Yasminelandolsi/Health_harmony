import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed
import './SignUp.css';

function SignUp({ setCurrentForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/User/signup', {
        name,
        email,
        password
      });
      console.log(response.data);
      if (response.data.status === "SUCCESS") {
        // Redirect or handle successful signup
      }
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <label className="signup-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="signup-input" />
        </label>
        <label className="signup-label">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="signup-input" />
        </label>
        <label className="signup-label">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="signup-input" />
        </label>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <div className="signup-footer">
        <a href="#" onClick={() => setCurrentForm('signin')}>Already have an account? Sign In</a>
      </div>
    </div>
  );
}

export default SignUp;
