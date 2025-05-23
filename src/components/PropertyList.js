import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import './PropertyList.css';

// PropertyCard component to display individual property details
const PropertyCard = ({ property, onAddToFavorites }) => {
  // useDrag hook to make the property card draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: property,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={drag} 
      className={`property-card ${isDragging ? 'dragging' : ''}`}
    >
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
            onClick={() => onAddToFavorites(property)}
            className="favorite-button"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

// PropertyList component to display a list of properties
const PropertyList = ({ properties, onAddToFavorites }) => {
  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p className="no-results">No properties found matching your criteria.</p>
      ) : (
        // Map through the properties and render a PropertyCard for each
        properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onAddToFavorites={onAddToFavorites}
          />
        ))
      )}
    </div>
  );
};

export default PropertyList;