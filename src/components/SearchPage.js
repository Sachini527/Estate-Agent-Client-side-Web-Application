// Importing necessary libraries and components
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavoritesList from './FavoritesList';
import propertyData from '../data/properties.json';
import './SearchPage.css';

// Main component for the search page
const SearchPage = ({ favorites, onAddToFavorites, onRemoveFavorite, onClearFavorites }) => {
  // State to hold search results, initialized with all properties
  const [searchResults, setSearchResults] = useState(propertyData.properties);

  // Function to handle search based on criteria
  const handleSearch = (criteria) => {
    let filtered = propertyData.properties;

    // Filter by property type if specified
    if (criteria.type && criteria.type !== 'any') {
      filtered = filtered.filter(property => property.type === criteria.type);
    }

    // Filter by minimum price if specified
    if (criteria.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(criteria.minPrice));
    }

    // Filter by maximum price if specified
    if (criteria.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(criteria.maxPrice));
    }

    if (criteria.minBedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(criteria.minBedrooms));
    }

    if (criteria.maxBedrooms) {
      filtered = filtered.filter(property => property.bedrooms <= parseInt(criteria.maxBedrooms));
    }

    if (criteria.postcode) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(criteria.postcode.toLowerCase())
      );
    }

    // Filter by date added if specified
    if (criteria.dateAfter) {
      const searchDate = new Date(criteria.dateAfter);
      filtered = filtered.filter(property => {
        const propertyDate = new Date(
          property.added.year,
          getMonthNumber(property.added.month),
          property.added.day
        );
        return propertyDate >= searchDate;
      });
    }
    // Update search results state
    setSearchResults(filtered);
  };

  // Helper function to convert month name to month number
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName];
  };

  return (
    <div className="search-page">
      <div className="search-content">
        {/* Search form component */}
        <SearchForm onSearch={handleSearch} />
        {/* Property list component to display search results */}
        <PropertyList 
          properties={searchResults}
          onAddToFavorites={onAddToFavorites}
          favorites={favorites}
        />
      </div>
      {/* Favorites list component */}
      <FavoritesList
        favorites={favorites}
        onAddToFavorites={onAddToFavorites}
        onRemove={onRemoveFavorite}
        onClear={onClearFavorites}
      />
    </div>
  );
};

export default SearchPage;