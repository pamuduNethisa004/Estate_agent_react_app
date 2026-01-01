import React from "react";
import { Link } from "react-router-dom";

function PropertyCard({
  property,
  addToFavourites,
  removeFromFavourites,
  favourites,
}) {
  const isFavourite =
    favourites && favourites.find((fav) => fav.id === property.id);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
    e.dataTransfer.setData("property", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div 
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
      style={{ cursor: "grab" }}
    >
      <img 
        src={property.images && property.images.length > 0 ? property.images[0] : "https://via.placeholder.com/400x220?text=No+Image"} 
        alt={property.type}
      />
      
      <div className="property-content">
        <div className="property-title">
          {property.location || property.address}
        </div>
        
        <div className="property-price">
          £{property.price.toLocaleString()}
        </div>
        
        <div className="property-meta">
          {property.type} • {property.bedrooms} Beds
        </div>
        
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>
          {property.shortDescription}
        </p>
        
        <div className="card-buttons">
          <Link to={`/property/${property.id}`} style={{ flex: 1, textDecoration: "none" }}>
            <button className="btn-view">View Details</button>
          </Link>
          
          {addToFavourites && !isFavourite && (
            <button 
              className="btn-save" 
              onClick={() => addToFavourites(property)}
            >
              ♥ Save
            </button>
          )}

          {removeFromFavourites && isFavourite && (
            <button 
              className="btn-save" 
              onClick={() => removeFromFavourites(property.id)}
              style={{ backgroundColor: "#e74c3c", color: "white" }}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;