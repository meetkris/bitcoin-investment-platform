import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import Map from '../components/Map';
import PropertyCard from '../components/PropertyCard';

const Listings = () => {
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        city: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: ''
    });
    const [sortBy, setSortBy] = useState('newest');

    // Handle search query from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            setFilters(prev => ({ ...prev, city: searchQuery }));
        }
    }, [location.search]);

    useEffect(() => {
        api.get('/properties')
            .then(res => {
                setProperties(res.data);
                setFilteredProperties(res.data);
            })
            .catch(err => console.error('API Error:', err));
    }, []);

    useEffect(() => {
        let filtered = [...properties];

        // Enhanced global search - searches city, state, address
        if (filters.city) {
            const searchTerm = filters.city.toLowerCase();
            filtered = filtered.filter(p => {
                const city = (p.city || '').toLowerCase();
                const state = (p.state || '').toLowerCase();
                const address = (p.address || '').toLowerCase();
                const zip = (p.zip || '').toLowerCase();

                return city.includes(searchTerm) ||
                    state.includes(searchTerm) ||
                    address.includes(searchTerm) ||
                    zip.includes(searchTerm);
            });
        }

        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
        }

        if (filters.bedrooms) {
            filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
        }

        if (filters.bathrooms) {
            filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
        }

        if (filters.propertyType) {
            filtered = filtered.filter(p => p.propertyType === filters.propertyType);
        }

        // Apply sorting
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
        }

        setFilteredProperties(filtered);
    }, [filters, sortBy, properties]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="listings-page">
            <div className="map-container">
                <Map properties={filteredProperties} />
            </div>
            <div className="listings-container">
                <div className="listings-header">
                    <h1>{filteredProperties.length} Homes Available</h1>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                    </select>
                </div>

                <div className="filters">
                    <input
                        type="text"
                        placeholder="City"
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                    />
                    <select
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    >
                        <option value="">Property Type</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Condo">Condo</option>
                    </select>
                    <select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    >
                        <option value="">Bedrooms</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                    <select
                        value={filters.bathrooms}
                        onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    >
                        <option value="">Bathrooms</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                    </select>
                    <select
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    >
                        <option value="">Max Price</option>
                        <option value="500000">$500k</option>
                        <option value="1000000">$1M</option>
                        <option value="1500000">$1.5M</option>
                        <option value="2000000">$2M</option>
                        <option value="3000000">$3M</option>
                    </select>
                </div>

                <div className="listings-grid">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} horizontal={true} />
                        ))
                    ) : (
                        <div className="no-results">
                            <h3>No properties found</h3>
                            <p>Try adjusting your filters to see more results.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listings;
