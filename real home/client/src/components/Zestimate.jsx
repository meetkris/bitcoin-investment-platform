import React, { useState } from 'react';
import './Zestimate.css';

const Zestimate = ({ price }) => {
    const [showInfo, setShowInfo] = useState(false);

    // Calculate Zestimate range (±3%)
    const zestimate = Math.round(price * 1.02);
    const zestimateLow = Math.round(zestimate * 0.97);
    const zestimateHigh = Math.round(zestimate * 1.03);

    return (
        <div className="zestimate-container">
            <div className="zestimate-header">
                <h4>
                    Zestimate<sup>®</sup>
                    <button
                        className="info-btn"
                        onMouseEnter={() => setShowInfo(true)}
                        onMouseLeave={() => setShowInfo(false)}
                    >
                        ⓘ
                    </button>
                </h4>
                {showInfo && (
                    <div className="zestimate-tooltip">
                        The Zestimate® home valuation model is Zillow's estimate of a home's market value.
                        A Zestimate incorporates public, MLS and user-submitted data into Zillow's proprietary formula.
                    </div>
                )}
            </div>

            <div className="zestimate-value">
                ${zestimate.toLocaleString()}
            </div>

            <div className="zestimate-range">
                <div className="range-bar">
                    <div className="range-fill"></div>
                    <div className="range-marker"></div>
                </div>
                <div className="range-labels">
                    <span>${zestimateLow.toLocaleString()}</span>
                    <span>${zestimateHigh.toLocaleString()}</span>
                </div>
            </div>

            <div className="zestimate-details">
                <div className="detail-item">
                    <span className="label">Est. Range</span>
                    <span className="value">
                        ${zestimateLow.toLocaleString()} - ${zestimateHigh.toLocaleString()}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="label">Zestimate vs. List Price</span>
                    <span className={`value ${zestimate > price ? 'positive' : 'negative'}`}>
                        {zestimate > price ? '+' : ''}
                        {(((zestimate - price) / price) * 100).toFixed(1)}%
                    </span>
                </div>
            </div>

            <div className="zestimate-actions">
                <button className="btn btn-outline">Update Zestimate</button>
                <button className="btn btn-outline">See Zestimate History</button>
            </div>
        </div>
    );
};

export default Zestimate;
