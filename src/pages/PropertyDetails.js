import React from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";

function PropertyDetails() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to search</Link>

      <h1>{property.type}</h1>
      <p><strong>Price:</strong> £{property.price}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p>{property.longDescription}</p>
    </div>
  );
}

export default PropertyDetails;
