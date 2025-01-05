import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDrag } from 'react-dnd';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import propertyData from '../data/properties.json';
import './PropertyDetails.css';

const PropertyDetails = ({ favorites, onAddToFavorites, onRemoveFavorite }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  
  const property = propertyData.properties.find(p => p.id === id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: property,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (!property) {
    return <div className="not-found">Property not found</div>;
  }

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
            {/* Using OpenStreetMap instead of Google Maps as it doesn't require an API key */}
            <iframe
              title="Property Location"
              width="100%"
              height="450"
              frameBorder="0"
              scrolling="no"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.coordinates.longitude-0.01}%2C${property.coordinates.latitude-0.01}%2C${property.coordinates.longitude+0.01}%2C${property.coordinates.latitude+0.01}&layer=mapnik&marker=${property.coordinates.latitude}%2C${property.coordinates.longitude}`}
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;