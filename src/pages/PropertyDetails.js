import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";

function PropertyDetails({ addToFavourites, removeFromFavourites, favourites }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(0);

  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  if (!property) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Property not found</h2>
        <Link to="/" style={{ color: "#2fb3c4", textDecoration: "none", fontWeight: 600 }}>
          ← Back to search
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ["https://via.placeholder.com/1200x600?text=No+Image"];

  const isFavourite = favourites && favourites.find((fav) => fav.id === property.id);

  return (
    <div style={{ 
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      paddingBottom: "60px"
    }}>
      {/* Back Button */}
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto",
        padding: "20px 40px"
      }}>
        <Link 
          to="/" 
          style={{ 
            color: "#2fb3c4", 
            textDecoration: "none", 
            fontWeight: 600,
            fontSize: "16px",
            display: "inline-block"
          }}
        >
          ← Back to search
        </Link>
      </div>

      {/* Main Image */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 40px"
      }}>
        <div style={{
          width: "100%",
          height: "500px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          <img 
            src={images[mainImage]}
            alt="Main property view"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* Thumbnail Gallery */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          overflowX: "auto",
          paddingBottom: "10px"
        }}>
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setMainImage(index)}
              style={{
                minWidth: "140px",
                height: "100px",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                border: mainImage === index ? "3px solid #2fb3c4" : "3px solid transparent",
                transition: "all 0.2s ease",
                opacity: mainImage === index ? 1 : 0.7
              }}
            >
              <img 
                src={img}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Property Info & Tabs */}
      <div style={{
        maxWidth: "1400px",
        margin: "40px auto 0",
        padding: "0 40px"
      }}>
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "20px", 
          padding: "40px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          {/* Property Title & Price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: "32px", 
                marginTop: 0,
                marginBottom: "8px",
                color: "#2c3e50"
              }}>
                {property.location || property.address || property.type}
              </h1>
              
              <p style={{ 
                fontSize: "36px", 
                color: "#2fb3c4", 
                fontWeight: "700",
                margin: "16px 0"
              }}>
                £{property.price.toLocaleString()}
              </p>
              
              <p style={{ color: "#777", fontSize: "18px", marginBottom: "0" }}>
                <strong>{property.type}</strong> • <strong>{property.bedrooms}</strong> Bedrooms
              </p>
            </div>

            {/* Save Button */}
            <div>
              {addToFavourites && !isFavourite && (
                <button 
                  onClick={() => {
                    addToFavourites(property);
                    alert("Property added to favourites!");
                  }}
                  style={{
                    background: "white",
                    color: "#e74c3c",
                    border: "2px solid #e74c3c",
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#e74c3c";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#e74c3c";
                  }}
                >
                  <span style={{ fontSize: "20px" }}>♥</span> Save Property
                </button>
              )}

              {removeFromFavourites && isFavourite && (
                <button 
                  onClick={() => {
                    removeFromFavourites(property.id);
                    alert("Property removed from favourites!");
                  }}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "2px solid #e74c3c",
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#c0392b";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#e74c3c";
                  }}
                >
                  <span style={{ fontSize: "20px" }}>✓</span> Saved
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ 
            borderBottom: "2px solid #e5e5e5",
            display: "flex",
            gap: "8px",
            marginBottom: "32px",
            marginTop: "32px"
          }}>
            <button 
              onClick={() => setActiveTab("description")}
              style={{
                padding: "14px 28px",
                border: "none",
                backgroundColor: "transparent",
                color: activeTab === "description" ? "#2c3e50" : "#999",
                borderBottom: activeTab === "description" ? "3px solid #2fb3c4" : "none",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "-2px",
                transition: "all 0.2s ease"
              }}
            >
              Full Description
            </button>
            <button 
              onClick={() => setActiveTab("floorplan")}
              style={{
                padding: "14px 28px",
                border: "none",
                backgroundColor: "transparent",
                color: activeTab === "floorplan" ? "#2c3e50" : "#999",
                borderBottom: activeTab === "floorplan" ? "3px solid #2fb3c4" : "none",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "-2px",
                transition: "all 0.2s ease"
              }}
            >
              Floor Plan
            </button>
            <button 
              onClick={() => setActiveTab("map")}
              style={{
                padding: "14px 28px",
                border: "none",
                backgroundColor: "transparent",
                color: activeTab === "map" ? "#2c3e50" : "#999",
                borderBottom: activeTab === "map" ? "3px solid #2fb3c4" : "none",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "-2px",
                transition: "all 0.2s ease"
              }}
            >
              Map
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "description" && (
              <div>
                <h3 style={{ fontSize: "22px", color: "#2c3e50", marginBottom: "16px" }}>
                  Property Description
                </h3>
                <p style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8", 
                  color: "#555",
                  marginBottom: "24px"
                }}>
                  {property.longDescription || property.shortDescription}
                </p>
                
                <h3 style={{ fontSize: "22px", color: "#2c3e50", marginTop: "32px", marginBottom: "16px" }}>
                  Key Features
                </h3>
                <ul style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.8", 
                  color: "#555",
                  paddingLeft: "20px"
                }}>
                  <li>{property.bedrooms} Bedrooms</li>
                  <li>{property.type} property</li>
                  <li>Located in {property.postcodeArea}</li>
                  <li>Added on {new Date(property.dateAdded).toLocaleDateString()}</li>
                </ul>
              </div>
            )}

            {activeTab === "floorplan" && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                {property.floorPlan ? (
                  <img 
                    src={property.floorPlan}
                    alt="Floor plan"
                    style={{ 
                      maxWidth: "100%", 
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                  />
                ) : (
                  <div style={{
                    padding: "60px 20px",
                    color: "#999",
                    fontSize: "18px"
                  }}>
                    Floor plan not available for this property
                  </div>
                )}
              </div>
            )}

            {activeTab === "map" && (
              <div style={{ 
                textAlign: "center", 
                padding: "40px 0"
              }}>
                <div style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "12px",
                  backgroundColor: "#e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: "18px"
                }}>
                  Map view for {property.postcodeArea}
                  <br />
                  <small style={{ display: "block", marginTop: "10px", fontSize: "14px" }}>
                    (Integrate Google Maps or Mapbox here)
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;