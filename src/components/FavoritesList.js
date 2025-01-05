import React from 'react';
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onRemove, onClear, onAddToFavorites }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => onAddToFavorites(item),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div ref={drop} className={`favorites-list ${isOver ? 'drag-over' : ''}`}>
      <div className="favorites-header">
        <h2>Favorites</h2>
        {favorites.length > 0 && (
          <button onClick={onClear} className="clear-favorites">
            Clear All
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <p className="no-favorites">Drag properties here to add to favorites</p>
      ) : (
        <div className="favorites-items">
          {favorites.map(property => (
            <div key={property.id} className="favorite-item">
              <img src={property.picture} alt={property.type} className="favorite-image" />
              <div className="favorite-info">
                <Link to={`/property/${property.id}`}>
                  <h4>{property.type} - {property.bedrooms} bed</h4>
                  <p>£{property.price.toLocaleString()}</p>
                </Link>
                <button
                  onClick={() => onRemove(property.id)}
                  className="remove-favorite"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;