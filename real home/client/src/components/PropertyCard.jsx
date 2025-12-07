import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property, horizontal = false }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
        // In a real app, this would save to localStorage or backend
    };

    const handleShare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Check out this property: ${property.title}`,
                url: window.location.origin + `/property/${property.id}`
            });
        } else {
            alert('Link copied to clipboard!');
            navigator.clipboard.writeText(window.location.origin + `/property/${property.id}`);
        }
    };

    const getStatusBadge = () => {
        if (property.status === 'new') {
            return <span className="status-badge new">New</span>;
        } else if (property.status === 'price_reduced') {
            return <span className="status-badge price-reduced">Price Reduced</span>;
        }
        return null;
    };

    return (
        <Link to={`/property/${property.id}`} className={`property-card ${horizontal ? 'horizontal' : ''}`}>
            <div className="card-image-container">
                <img
                    src={property.images && property.images.length > 0
                        ? property.images[0]
                        : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
                    }
                    alt={property.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop';
                    }}
                />
                {getStatusBadge()}
                <div className="card-actions">
                    <button
                        className={`action-btn save ${isSaved ? 'saved' : ''}`}
                        onClick={handleSave}
                        title={isSaved ? 'Saved' : 'Save'}
                    >
                        {isSaved ? '❤️' : '🤍'}
                    </button>
                    <button
                        className="action-btn share"
                        onClick={handleShare}
                        title="Share"
                    >
                        📤
                    </button>
                </div>
                <div className="image-count">
                    📷 {property.images && property.images.length > 0 ? property.images.length : 1}
                </div>
            </div>
            <div className="property-info">
                <h3>{property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</h3>
                <p className="property-stats">
                    <strong>{property.bedrooms} bd</strong> |
                    <strong> {property.bathrooms} ba</strong> |
                    <strong> {property.sqft.toLocaleString()} sqft</strong>
                    {property.lotSize > 0 && <> | <strong> {property.lotSize} ac lot</strong></>}
                </p>
                <p className="property-address">{property.address}, {property.city}, {property.state}</p>
                <p className="property-type">{property.propertyType} • Built in {property.yearBuilt}</p>
                {!horizontal && (
                    <p className="property-description">{property.description.substring(0, 100)}...</p>
                )}
                <div className="property-meta">
                    <span className="days-on-market">{property.daysOnMarket} days on Zillow</span>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
