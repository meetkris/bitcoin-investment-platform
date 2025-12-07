import React from 'react';
import './Schools.css';

const Schools = ({ city }) => {
    // Mock school data
    const schools = [
        {
            name: `${city} Elementary School`,
            rating: 9,
            grades: 'K-5',
            type: 'Public',
            distance: '0.3 mi',
            students: 450
        },
        {
            name: `${city} Middle School`,
            rating: 8,
            grades: '6-8',
            type: 'Public',
            distance: '0.7 mi',
            students: 620
        },
        {
            name: `${city} High School`,
            rating: 7,
            grades: '9-12',
            type: 'Public',
            distance: '1.2 mi',
            students: 1200
        },
        {
            name: 'St. Mary\'s Academy',
            rating: 10,
            grades: 'K-12',
            type: 'Private',
            distance: '0.9 mi',
            students: 350
        }
    ];

    const getRatingColor = (rating) => {
        if (rating >= 8) return '#00A300';
        if (rating >= 6) return '#F59E0B';
        return '#E80000';
    };

    return (
        <div className="schools-section">
            <h3>Schools</h3>
            <p className="schools-disclaimer">
                School service boundaries are intended to be used as a reference only.
                To verify enrollment eligibility, contact the school directly.
            </p>

            <div className="schools-list">
                {schools.map((school, index) => (
                    <div key={index} className="school-card">
                        <div className="school-rating" style={{ background: getRatingColor(school.rating) }}>
                            {school.rating}/10
                        </div>
                        <div className="school-info">
                            <h4>{school.name}</h4>
                            <div className="school-details">
                                <span className="detail-badge">{school.grades}</span>
                                <span className="detail-badge">{school.type}</span>
                                <span className="detail-text">{school.students} students</span>
                            </div>
                            <div className="school-distance">
                                📍 {school.distance} from this home
                            </div>
                        </div>
                        <button className="school-link">View Details →</button>
                    </div>
                ))}
            </div>

            <div className="school-ratings-info">
                <h4>About School Ratings</h4>
                <p>
                    Ratings are on a scale of 1 (below average) to 10 (above average) and can include
                    test scores, college readiness, academic progress, advanced courses, equity,
                    discipline and attendance data.
                </p>
            </div>
        </div>
    );
};

export default Schools;
