import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>RealEstate</h3>
                        <p>Your trusted partner in finding the perfect home. We make real estate simple and accessible.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <a href="/">Home</a>
                        <a href="/listings">Browse Listings</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>Email: info@realestate.com</p>
                        <p>Phone: (555) 123-4567</p>
                        <p>Address: 123 Real Estate Blvd</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 RealEstate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
