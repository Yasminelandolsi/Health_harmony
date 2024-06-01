import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentForm, setCurrentForm] = useState("signin");

    const handleLoginSuccess = () => setIsLoggedIn(true);

    const toggleForm = () => setCurrentForm(prevForm => prevForm === "signin" ? "signup" : "signin");

    return (
        <div className="App">
            {isLoggedIn ? (
                <Home />
            ) : (
                <div className="form-container">
                    {currentForm === "signin" ? (
                        <SignIn onLoginSuccess={handleLoginSuccess} />
                    ) : (
                        <SignUp setCurrentForm={setCurrentForm} />
                    )}
                    <button onClick={toggleForm}>
                        {currentForm === "signin" ? "Don't have an account? Sign Up" : "Have an account? Sign In"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
