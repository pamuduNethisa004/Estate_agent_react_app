import React from "react";
import propertiesData from "./data/properties.json";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Estate Agent Properties</h1>

      {propertiesData.properties.map((property) => (
        <div
          key={property.id}
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
      ))}
    </div>
  );
}

export default App;
