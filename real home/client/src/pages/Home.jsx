import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import PropertyCarousel from '../components/PropertyCarousel';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('buy');

    useEffect(() => {
        api.get('/properties')
            .then(res => {
                // Show new listings and price reduced first
                const sorted = res.data.sort((a, b) => {
                    if (a.status === 'new' && b.status !== 'new') return -1;
                    if (a.status !== 'new' && b.status === 'new') return 1;
                    return a.daysOnMarket - b.daysOnMarket;
                });
                setFeaturedProperties(sorted);
                setRecentlyViewed(sorted.slice(0, 3));
            })
            .catch(err => console.error('API Error:', err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    const newListings = featuredProperties.filter(p => p.status === 'new').slice(0, 6);
    const priceReduced = featuredProperties.filter(p => p.status === 'price_reduced').slice(0, 6);

    return (
        <div className="home">
            <header className="hero">
                <HeroSlider />
                <div className="hero-content">
                    <h1>Agents. Tours. Loans. Homes.</h1>
                    <p className="hero-subtitle">Find it all here.</p>

                    <div className="search-tabs">
                        <button
                            className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
                            onClick={() => setActiveTab('buy')}
                        >
                            Buy
                        </button>
                        <button
                            className={`tab ${activeTab === 'rent' ? 'active' : ''}`}
                            onClick={() => setActiveTab('rent')}
                        >
                            Rent
                        </button>
                        <button
                            className={`tab ${activeTab === 'sold' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sold')}
                        >
                            Sold
                        </button>
                    </div>

                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Enter an address, neighborhood, city, or ZIP code"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            🔍
                        </button>
                    </form>
                </div>
            </header>

            <section className="container home-content">
                {recentlyViewed.length > 0 && (
                    <PropertyCarousel
                        properties={recentlyViewed}
                        title="Recently viewed"
                    />
                )}

                {newListings.length > 0 && (
                    <PropertyCarousel
                        properties={newListings}
                        title="New listings"
                    />
                )}

                {priceReduced.length > 0 && (
                    <PropertyCarousel
                        properties={priceReduced}
                        title="Price reduced"
                    />
                )}

                <div className="cta-section">
                    <div className="cta-card">
                        <h3>Buy a home</h3>
                        <p>Find your place with an immersive photo experience and the most listings.</p>
                        <Link to="/listings" className="btn btn-primary">Browse homes</Link>
                    </div>
                    <div className="cta-card">
                        <h3>Sell a home</h3>
                        <p>No matter what path you take to sell your home, we can help you navigate it.</p>
                        <button className="btn btn-outline">See your options</button>
                    </div>
                    <div className="cta-card">
                        <h3>Get a home loan</h3>
                        <p>Get pre-qualified to see what you can afford and lock in your rate.</p>
                        <button className="btn btn-outline">Get pre-qualified</button>
                    </div>
                </div>
            </section>

            <section className="why-choose container">
                <h2>Whether you're buying, selling or renting, we can help you move forward.</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🏠</div>
                        <h3>Buy a home</h3>
                        <p>With over 1 million+ homes for sale available on the website, Zillow can match you with a house you will want to call home.</p>
                        <Link to="/listings">Find homes</Link>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Sell a home</h3>
                        <p>Whether you want to sell your current home, buy your first, or move into your dream home, we're here to help.</p>
                        <a href="#">See your options</a>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔑</div>
                        <h3>Rent a home</h3>
                        <p>We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</p>
                        <a href="#">Find rentals</a>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>See neighborhoods</h3>
                        <p>With comprehensive information about neighborhoods, you can find the right place to live for you.</p>
                        <a href="#">Learn more</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
