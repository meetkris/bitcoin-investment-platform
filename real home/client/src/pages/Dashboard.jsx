import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard container">
            <h1>User Dashboard</h1>
            <div className="dashboard-content">
                <div className="card">
                    <h3>Saved Searches</h3>
                    <p>No saved searches yet.</p>
                </div>
                <div className="card">
                    <h3>My Listings</h3>
                    <p>You have no active listings.</p>
                </div>
                <div className="card">
                    <h3>Profile Settings</h3>
                    <button className="btn btn-outline">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
