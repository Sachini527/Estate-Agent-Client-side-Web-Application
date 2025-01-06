// Code for the main App component that renders the SearchPage and PropertyDetails components
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './components/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import './App.css';
import SavedProperties from './components/SavedProperties';

function App() {
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToFavorites = (property) => {
    setFavorites(prevFavorites => {
      // Check if property already exists in favorites
      if (!prevFavorites.some(fav => fav.id === property.id)) {
        return [...prevFavorites, property];
      }
      return prevFavorites;
    });
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(property => property.id !== propertyId)
    );
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>Estate Agent Property Search</h1>
            <nav className="app-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/saved">Saved Properties</Link></li>
              </ul>
            </nav>
          </header>
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <SearchPage
                    favorites={favorites}
                    onAddToFavorites={handleAddToFavorites}
                    onRemoveFavorite={handleRemoveFavorite}
                    onClearFavorites={handleClearFavorites}
                  />
                }
              />
              <Route
                path="/property/:id"
                element={
                  <PropertyDetails
                    favorites={favorites}
                    onAddToFavorites={handleAddToFavorites}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                }
              />
              <Route
                path="/saved"
                element={
                  <SavedProperties
                    favorites={favorites}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                }
              />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2024 Estate Agent. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;