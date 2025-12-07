import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ properties }) => {
    // Calculate center based on properties
    const center = properties.length > 0
        ? [properties[0].latitude, properties[0].longitude]
        : [39.8283, -98.5795]; // Center of USA

    return (
        <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map(property => (
                <Marker key={property.id} position={[property.latitude, property.longitude]}>
                    <Popup>
                        <div style={{ minWidth: '200px' }}>
                            <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{property.title}</h3>
                            <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#2563eb' }}>
                                {property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </p>
                            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                                {property.bedrooms} beds | {property.bathrooms} baths
                            </p>
                            <a href={`/property/${property.id}`} style={{ color: '#2563eb', textDecoration: 'none' }}>
                                View Details →
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
