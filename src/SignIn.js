import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';  // Ensure the CSS file is imported

function SignIn({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/User/signin', {
                email: email,
                password: password
            });
            if (response.data.status === "SUCCESS") {
                onLoginSuccess();
            } else {
                alert(response.data.message); // Displaying the backend error message
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login Failed: ' + error.message);
        }
    };

    return (
        <div className="signin-container">
                  <h2>Sign In</h2>

            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Log In</button>
                <div className="signin-footer">
                    <a href="#">Forgot Password?</a>
                    <p>Don't have an account? <a href="/SignUp">Sign Up</a></p>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
