import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAfter: null
  });

  const propertyTypes = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, type: selectedOption.value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, dateAfter: date }));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-row">
        <div className="form-group">
          <label>Property Type</label>
          <Select
            options={propertyTypes}
            onChange={handleTypeChange}
            defaultValue={propertyTypes[0]}
            className="react-select"
          />
        </div>

        <div className="form-group">
          <label>Price Range</label>
          <div className="price-inputs">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={formData.minPrice}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={formData.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Bedrooms</label>
          <div className="bedroom-inputs">
            <input
              type="number"
              name="minBedrooms"
              placeholder="Min Bedrooms"
              value={formData.minBedrooms}
              onChange={handleChange}
              min="0"
            />
            <input
              type="number"
              name="maxBedrooms"
              placeholder="Max Bedrooms"
              value={formData.maxBedrooms}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Postcode Area</label>
          <input
            type="text"
            name="postcode"
            placeholder="e.g. BR1, NW1"
            value={formData.postcode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Added After Date</label>
          <DatePicker
            selected={formData.dateAfter}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
            className="date-picker"
          />
        </div>
      </div>

      <button type="submit" className="search-button">Search Properties</button>
    </form>
  );
};

export default SearchForm;