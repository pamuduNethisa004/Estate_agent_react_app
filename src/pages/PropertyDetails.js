import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";

function PropertyDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");

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

      {/* Tabs */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setActiveTab("description")}>
          Description
        </button>
        <button onClick={() => setActiveTab("images")}>
          Images
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: "20px" }}>
        {activeTab === "description" && (
          <p>{property.longDescription}</p>
        )}

        {activeTab === "images" && (
          <div>
            {property.images && property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Property"
                style={{ width: "200px", marginRight: "10px" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
