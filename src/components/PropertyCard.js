import React from "react";

function PropertyCard({ property }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        marginBottom: "12px",
        padding: "12px",
        borderRadius: "6px",
      }}
    >
      <h2>{property.type}</h2>
      <p><strong>Price:</strong> £{property.price}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p>{property.shortDescription}</p>
    </div>
  );
}

export default PropertyCard;
