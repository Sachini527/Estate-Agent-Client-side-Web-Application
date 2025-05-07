# 🏡 Estate Agent Property Search Application

A **client-side web application** for an estate agent that enables users to search for properties based on various criteria, view detailed property information, and save favorite properties.

---

## ✨ Features

### 🔍 Property Search

- Search properties by:
  - Type (house, flat, any)
  - Price range (min and max)
  - Number of bedrooms (min and max)
  - Date added (after a specified date)
  - Postcode area

### 🖼️ Property Display

- Grid layout of property cards showing:
  - Property image
  - Type and bedroom count
  - Price
  - Location
  - Actions (view details, add to favorites)

### 🏠 Property Details

- Detailed view of each property including:
  - Image gallery with thumbnails
  - Property specifications
  - Tabbed sections for:
    - Detailed description
    - Floor plan
    - Google Maps location

### ⭐ Favorites Management

- Add properties to favorites:
  - By clicking the "Add to Favorites" button
  - By dragging property cards to the favorites panel
- Remove properties from favorites:
  - By clicking the "Remove" button
  - By dragging out of the favorites panel
- Clear all favorites with one click
- Favorites persist between sessions using `localStorage`

### 📱 Responsive Design

- Adapts layout for different screen sizes:
  - Desktop: Side-by-side layout for search results and favorites
  - Mobile: Stacked layout for improved mobile experience

---

## 🛠️ Technologies Used

- **React**: UI component library
- **React Router**: For page navigation
- **React DnD**: For drag-and-drop functionality
- **React Datepicker**: For date selection
- **React Select**: For dropdown selections
- **React Tabs**: For tabbed interface in property details
- **React Image Gallery**: For property image gallery
- **Google Maps API**: For property location display
- **CSS Grid & Flexbox**: For responsive layouts
- **LocalStorage API**: For persisting favorites data

---

## 📁 Project Structure

```bash
estate-agent-web-app/
├── public/
├── src/
│   ├── assets/                    # Images and static assets
│   ├── components/               # React components
│   │   ├── FavoritesList.js      # Favorites sidebar component
│   │   ├── PropertyCard.js       # Property card for listings
│   │   ├── PropertyDetails.js    # Property details view with tabs
│   │   ├── PropertyList.js       # Grid of property cards
│   │   ├── SavedProperties.js    # List of saved/favorite properties
│   │   ├── SearchForm.js         # Form with all search filters
│   │   └── SearchPage.js         # Main search layout
│   ├── data/
│   │   └── properties.json       # Property dataset
│   ├── hooks/                    # Custom React hooks (optional)
│   ├── utils/                    # Utility functions
│   ├── App.js                    # Main app component
│   ├── App.css                   # Global styles
│   └── index.js                  # App entry point
├── .gitignore
├── package.json
├── README.md
└── ... (other config files)
```

---

## 🚀 Installation and Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd estate-agent-web-app

# Install dependencies
npm install

# Start the development server
npm start

# Open in browser
http://localhost:3000
```

---

## 🔒 Security Features

- React's JSX automatically escapes content, preventing XSS attacks
- Input validation in search forms
- Proper data handling with state management
- Clean separation of data and presentation

---

## 📱 Responsive Design

- **Desktop**: Two-column layout with search results and favorites side by side
- **Mobile**: Stacked layout with search form, results, and favorites in a single column

Media queries and flexbox/grid layouts ensure the application is usable on devices of all sizes.

---

## 🌐 Browser Compatibility

This application works best in:

- Google Chrome ✅
- Mozilla Firefox ✅
- Microsoft Edge ✅
- Safari ✅

---

## 📄 License

© 2024 Estate Agent. All rights reserved.
