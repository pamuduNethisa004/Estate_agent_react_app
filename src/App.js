import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import propertiesData from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./pages/PropertyDetails";
import "./App.css";

function App() {
  /* ================= STATE ================= */
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateAdded: "",
    postcodeArea: "",
  });

  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  /* ================= FAVOURITES ================= */
  function addToFavourites(property) {
    if (!favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  }

  function removeFromFavourites(id) {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  }

  /* ================= DRAG AND DROP ================= */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const propertyData = e.dataTransfer.getData("property");
    if (propertyData) {
      try {
        const property = JSON.parse(propertyData);
        addToFavourites(property);
        setShowFavourites(true); // Auto-open favourites modal
      } catch (error) {
        console.error("Error parsing property data:", error);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  /* ================= FILTERING ================= */
  const filteredProperties = propertiesData.properties.filter((property) => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < Number(filters.minPrice))
      return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice))
      return false;
    if (
      filters.minBedrooms &&
      property.bedrooms < Number(filters.minBedrooms)
    )
      return false;
    if (
      filters.maxBedrooms &&
      property.bedrooms > Number(filters.maxBedrooms)
    )
      return false;
    if (
      filters.dateAdded &&
      new Date(property.dateAdded) < new Date(filters.dateAdded)
    )
      return false;
    if (
      filters.postcodeArea &&
      !property.postcodeArea
        .toLowerCase()
        .includes(filters.postcodeArea.toLowerCase())
    )
      return false;

    return true;
  });

  /* ================= RENDER ================= */
  return (
    <>
      {/* HEADER */}
      <div className="app-header">
        <span>Estate Agent App</span>
        
        {/* FAVOURITES BUTTON */}
        <button 
          className="favourites-btn"
          onClick={() => setShowFavourites(!showFavourites)}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          style={{
            transition: "all 0.3s ease"
          }}
        >
          <span className="heart-icon">♥</span>
          <span className="fav-count">{favourites.length}</span>
        </button>
      </div>

      {/* FAVOURITES MODAL */}
      {showFavourites && (
        <div className="favourites-modal-overlay" onClick={() => setShowFavourites(false)}>
          <div className="favourites-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>My Favourites ({favourites.length})</h2>
              <button 
                className="close-btn"
                onClick={() => setShowFavourites(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              {favourites.length === 0 ? (
                <p className="empty-message">No favourites yet. Start saving properties!</p>
              ) : (
                <div className="favourites-grid">
                  {favourites.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      removeFromFavourites={removeFromFavourites}
                      favourites={favourites}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              {/* LEFT: SEARCH */}
              <SearchForm filters={filters} setFilters={setFilters} />

              {/* RIGHT: PROPERTY LIST */}
              <div>
                <h2>Properties For Sale ({filteredProperties.length})</h2>

                <div className="property-grid">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      addToFavourites={addToFavourites}
                      favourites={favourites}
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        />

        {/* DETAILS PAGE */}
        <Route 
          path="/property/:id" 
          element={
            <PropertyDetails 
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
              favourites={favourites}
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;