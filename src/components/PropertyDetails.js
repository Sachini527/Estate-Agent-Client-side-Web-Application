import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDrag } from 'react-dnd';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import propertyData from '../data/properties.json';
import './PropertyDetails.css';

// Component to display a Google Map with the given location
const PropertyMap = ({ location }) => {
  const [mapLoaded, setMapLoaded] = useState(false); // Tracks if the map API has loaded
  const [mapError, setMapError] = useState(null); // Tracks any errors in loading the map


  // Load the Google Maps API when the component mounts
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDszBp1HehZ-arLZJrJaKIU1Yvf2jzBvEk`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => setMapLoaded(true));
      script.addEventListener('error', () => setMapError('Failed to load Google Maps'));
      document.head.appendChild(script);
    };

    // Load the script only if it hasn't been loaded yet
    if (!window.google) {
      loadGoogleMaps();
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Initialize and display the map once the API is loaded
  useEffect(() => {
    if (mapLoaded && location) {
      // Initialize the map
      const geocoder = new window.google.maps.Geocoder();
      const mapElement = document.getElementById('property-map');

      // Geocode the provided location and display it on the map
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK') {
          const map = new window.google.maps.Map(mapElement, {
            center: results[0].geometry.location,
            zoom: 15,
          });

          // Add a marker at the geocoded location
          new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          setMapError('Failed to locate the address');
        }
      });
    }
  }, [mapLoaded, location]);

  if (mapError) {
    return <div className="map-error">{mapError}</div>;
  }

  if (!mapLoaded) {
    return <div className="map-loading">Loading map...</div>;
  }

  return <div id="property-map" style={{ width: '100%', height: '450px' }} />;
};

// Main component to display property details
const PropertyDetails = ({ favorites, onAddToFavorites, onRemoveFavorite }) => {
  const { id } = useParams(); // Main component to display property details
  const [activeTab, setActiveTab] = useState(0); // Tracks the active tab index

  // Tracks the active tab index
  const property = propertyData.properties.find(p => p.id === id);

  // React DnD hook for drag-and-drop functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property', // Type of draggable item
    item: property, // Item being dragged
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Tracks drag state
    }),
  }));

  // Show a not-found message if the property doesn't exist
  if (!property) {
    return <div className="not-found">Property not found</div>;
  }

  // Check if the property is in the user's favorites
  const isFavorite = favorites.some(fav => fav.id === property.id);

  // Prepare images for the gallery
  const images = [
    {
      original: `/images/properties/${property.id}/main.jpg`,
      thumbnail: `/images/properties/${property.id}/main-thumb.jpg`,
    },
    {
      original: `/images/properties/${property.id}/living.jpg`,
      thumbnail: `/images/properties/${property.id}/living-thumb.jpg`,
    },
    {
      original: `/images/properties/${property.id}/kitchen.jpg`,
      thumbnail: `/images/properties/${property.id}/kitchen-thumb.jpg`,
    },
    {
      original: `/images/properties/${property.id}/bedroom1.jpg`,
      thumbnail: `/images/properties/${property.id}/bedroom1-thumb.jpg`,
    },
    {
      original: `/images/properties/${property.id}/bedroom2.jpg`,
      thumbnail: `/images/properties/${property.id}/bedroom2-thumb.jpg`,
    },
    {
      original: `/images/properties/${property.id}/bathroom.jpg`,
      thumbnail: `/images/properties/${property.id}/bathroom-thumb.jpg`,
    }
  ];

  // Toggle the favorite status of the property
  const handleToggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite(property.id);
    } else {
      onAddToFavorites(property);
    }
  };

  return (
    <div className="property-details" ref={drag}>
      <div className="property-header">
        <div className="property-title">
          <h2>{property.type} - {property.bedrooms} Bedrooms</h2>
          <button
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        <p className="price">£{property.price.toLocaleString()}</p>
        <p className="location">{property.location}</p>
      </div>

      <div className="image-gallery-container">
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          thumbnailPosition="bottom"
        />
      </div>

      <Tabs
        selectedIndex={activeTab}
        onSelect={index => setActiveTab(index)}
        className="property-tabs"
      >
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="description-content">
            <h3>Property Description</h3>
            <p>{property.description}</p>
            <div className="property-details-list">
              <div className="detail-item">
                <span className="label">Type:</span>
                <span>{property.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Bedrooms:</span>
                <span>{property.bedrooms}</span>
              </div>
              <div className="detail-item">
                <span className="label">Tenure:</span>
                <span>{property.tenure}</span>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="floorplan-content">
            <img
              src={`/images/properties/${property.id}/floorplan.jpg`}
              alt="Floor Plan"
              className="floorplan-image"
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="map-content">
            <PropertyMap location={property.location} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;