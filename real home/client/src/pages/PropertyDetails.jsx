import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ImageGallery from '../components/ImageGallery';
import Zestimate from '../components/Zestimate';
import PriceHistory from '../components/PriceHistory';
import Schools from '../components/Schools';
import MortgageCalculator from '../components/MortgageCalculator';
import PropertyCarousel from '../components/PropertyCarousel';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [allProperties, setAllProperties] = useState([]);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: 'I am interested in this property...'
    });

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email,
            }));
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propRes = await api.get(`/properties/${id}`);
                setProperty(propRes.data);

                const allRes = await api.get('/properties');
                setAllProperties(allRes.data);

                // Simple similar logic: same city or random
                const similar = allRes.data
                    .filter(p => p.id !== id)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                setSimilarProperties(similar);
            } catch (err) {
                console.error('Failed to fetch property details', err);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tours', {
                propertyId: id,
                ...formData,
                date: new Date().toISOString()
            });
            alert('Tour request sent successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: 'I am interested in this property...'
            });
        } catch (err) {
            console.error(err);
            alert('Failed to send tour request. Please try again.');
        }
    };

    const handleScheduleTour = () => {
        const contactForm = document.querySelector('.agent-contact');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Please use the contact form below to schedule a tour.');
        }
    };

    if (!property) return <div className="container" style={{ padding: '60px 0' }}>Loading...</div>;

    const nearbyHomes = allProperties.filter(p => p.id !== id && p.city === property.city).slice(0, 6);

    return (
        <div className="property-details">
            <div className="container">
                <div className="property-header">
                    <div>
                        <h1>{property.address}</h1>
                        <p>{property.city}, {property.state} {property.zip}</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-outline">
                            <span>❤️</span> Save
                        </button>
                        <button className="btn btn-outline">
                            <span>📤</span> Share
                        </button>
                        <button className="btn btn-primary" onClick={handleScheduleTour}>
                            📅 Schedule a Tour
                        </button>
                    </div>
                </div>

                <ImageGallery images={property.images} title={property.title} />

                <div className="details-content">
                    <div className="main-info">
                        <div className="price-section">
                            <h2>{property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</h2>
                            <div className="price-meta">
                                <span>{property.status === 'new' ? '🆕 New listing' : property.status === 'price_reduced' ? '📉 Price reduced' : '✓ Active'}</span>
                                <span>•</span>
                                <span>{property.daysOnMarket} days on Zillow</span>
                            </div>
                        </div>

                        <div className="stats">
                            <div className="stat-item">
                                <span className="stat-value">{property.bedrooms}</span>
                                <span className="stat-label">Bedrooms</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{property.bathrooms}</span>
                                <span className="stat-label">Bathrooms</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{property.sqft.toLocaleString()}</span>
                                <span className="stat-label">Sqft</span>
                            </div>
                            {property.lotSize > 0 && (
                                <div className="stat-item">
                                    <span className="stat-value">{property.lotSize}</span>
                                    <span className="stat-label">Acres</span>
                                </div>
                            )}
                        </div>

                        <Zestimate price={property.price} />

                        <div className="property-facts">
                            <h3>Property Details</h3>
                            <div className="facts-grid">
                                <div className="fact">
                                    <span className="fact-label">Property Type</span>
                                    <span className="fact-value">{property.propertyType}</span>
                                </div>
                                <div className="fact">
                                    <span className="fact-label">Year Built</span>
                                    <span className="fact-value">{property.yearBuilt}</span>
                                </div>
                                <div className="fact">
                                    <span className="fact-label">HOA Fees</span>
                                    <span className="fact-value">
                                        {property.hoaFees > 0 ? `$${property.hoaFees}/month` : 'None'}
                                    </span>
                                </div>
                                <div className="fact">
                                    <span className="fact-label">Days on Zillow</span>
                                    <span className="fact-value">{property.daysOnMarket} days</span>
                                </div>
                                <div className="fact">
                                    <span className="fact-label">Price/sqft</span>
                                    <span className="fact-value">${Math.round(property.price / property.sqft)}</span>
                                </div>
                                {property.lotSize > 0 && (
                                    <div className="fact">
                                        <span className="fact-label">Lot Size</span>
                                        <span className="fact-value">{property.lotSize} acres</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="description-section">
                            <h3>About this property</h3>
                            <p className="description">{property.description}</p>
                        </div>

                        <div className="features-section">
                            <h3>What's special</h3>
                            <ul className="features-list">
                                {property.features.map((feature, index) => (
                                    <li key={index}>✓ {feature}</li>
                                ))}
                            </ul>
                        </div>

                        <PriceHistory propertyId={property.id} />

                        <Schools city={property.city} />

                        <div className="neighborhood-section">
                            <h3>Neighborhood: {property.city}, {property.state}</h3>
                            <p>Explore what makes this neighborhood a great place to live.</p>

                            <div className="scores-grid">
                                <div className="score-card">
                                    <div className="score-value">78</div>
                                    <div className="score-label">Walk Score®</div>
                                    <div className="score-description">Very Walkable</div>
                                </div>
                                <div className="score-card">
                                    <div className="score-value">65</div>
                                    <div className="score-label">Transit Score®</div>
                                    <div className="score-description">Excellent Transit</div>
                                </div>
                                <div className="score-card">
                                    <div className="score-value">72</div>
                                    <div className="score-label">Bike Score®</div>
                                    <div className="score-description">Very Bikeable</div>
                                </div>
                            </div>

                            <div className="neighborhood-stats">
                                <div className="neighborhood-stat">
                                    <span className="stat-icon">🏫</span>
                                    <span>Highly rated schools nearby</span>
                                </div>
                                <div className="neighborhood-stat">
                                    <span className="stat-icon">🛒</span>
                                    <span>Shopping & dining within 2 miles</span>
                                </div>
                                <div className="neighborhood-stat">
                                    <span className="stat-icon">🚇</span>
                                    <span>Public transportation accessible</span>
                                </div>
                                <div className="neighborhood-stat">
                                    <span className="stat-icon">🌳</span>
                                    <span>Parks and recreation nearby</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="agent-contact">
                            <h3>Contact Agent</h3>
                            <div className="agent-info">
                                <div className="agent-avatar">👤</div>
                                <div>
                                    <div className="agent-name">Sarah Johnson</div>
                                    <div className="agent-company">Premier Realty Group</div>
                                    <div className="agent-rating">⭐ 4.9 (127 reviews)</div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Your Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>

                        <MortgageCalculator price={property.price} />
                    </div>
                </div>

                {nearbyHomes.length > 0 && (
                    <PropertyCarousel
                        properties={nearbyHomes}
                        title={`Nearby homes in ${property.city}`}
                    />
                )}

                {similarProperties.length > 0 && (
                    <PropertyCarousel
                        properties={similarProperties}
                        title="Homes you may like"
                    />
                )}
            </div>
        </div>
    );
};

export default PropertyDetails;
