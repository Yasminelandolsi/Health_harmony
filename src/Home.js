import React from 'react';
import './Home.css'; // Make sure to link the CSS file

function Home() {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Your Health is Our Top Priority</h1>
                <p>+26152434758 | healthapp@gmail.com</p>
            </header>
            <nav className="home-nav">
                <a href="#">Blog</a>
                <a href="#">News</a>
                <a href="#">Exercises</a>
                <a href="#">Nutritions</a>
                <a href="#">Chat</a>
            </nav>
            <div className="services">
                {/* Example service */}
                <div className="service">
                    <h3>Lose some weight</h3>
                    <p>Are you looking to adopt a healthier lifestyle and achieve your weight goals effectively and sustainably? Our weight loss service is designed to accompany you throughout this journey, offering personalized support and resources tailored to your individual needs.</p>
                </div>
                {/* Repeat for other services */}
            </div>
            <div className="footer">
                <div className="quick-links">
                    <a href="#">Blog</a>
                    <a href="#">News</a>
                    {/* Other quick links */}
                </div>
                <div className="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    {/* Other social links */}
                </div>
            </div>
        </div>
    );
}

export default Home;
