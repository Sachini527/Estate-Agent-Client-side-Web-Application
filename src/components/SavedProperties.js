import React from 'react';
import { Link } from 'react-router-dom';
import './SavedProperties.css';

const SavedProperties = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="saved-properties">
      <h2>Saved Properties</h2>
      {favorites.length === 0 ? (
        <p>No saved properties.</p>
      ) : (
        <div className="property-list">
          {favorites.map(property => (
            <div key={property.id} className="property-card">
              <img src={property.picture} alt={property.description} className="property-image" />
              <div className="property-info">
                <h3>{property.type} - {property.bedrooms} Bedrooms</h3>
                <p className="price">£{property.price.toLocaleString()}</p>
                <p className="location">{property.location}</p>
                <div className="property-actions">
                  <Link to={`/property/${property.id}`} className="view-details">
                    View Details
                  </Link>
                  <button
                    onClick={() => onRemoveFavorite(property.id)}
                    className="remove-favorite"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;