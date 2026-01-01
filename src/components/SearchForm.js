import React from "react";

function SearchForm({ filters, setFilters }) {
  return (
    <div className="search-box">
      <h2>Find Your Dream Home</h2>

      {/* PROPERTY TYPE */}
      <label>Type:</label>
      <select
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="">Any</option>
        <option value="House">House</option>
        <option value="Flat">Flat</option>
      </select>

      {/* PRICE RANGE */}
      <label>Price Range:</label>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          fontSize: "13px", 
          color: "#666",
          marginBottom: "8px"
        }}>
          <span>£{filters.minPrice ? Number(filters.minPrice).toLocaleString() : '0'}</span>
          <span>£{filters.maxPrice ? Number(filters.maxPrice).toLocaleString() : '2,000,000'}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2000000"
          step="10000"
          value={filters.minPrice || 0}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
          style={{ width: "100%", marginBottom: "8px" }}
        />
        <input
          type="range"
          min="0"
          max="2000000"
          step="10000"
          value={filters.maxPrice || 1000000}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
          style={{ width: "100%" }}
        />
      </div>

      {/* BEDROOM RANGE */}
      <label>Bedrooms:</label>
      <div style={{ marginBottom: "8px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          fontSize: "13px", 
          color: "#666",
          marginBottom: "8px"
        }}>
          <span>{filters.minBedrooms || '0'}</span>
          <span>{filters.maxBedrooms || '10'}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={filters.minBedrooms || 0}
          onChange={(e) =>
            setFilters({ ...filters, minBedrooms: e.target.value })
          }
          style={{ width: "100%", marginBottom: "8px" }}
        />
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={filters.maxBedrooms || 10}
          onChange={(e) =>
            setFilters({ ...filters, maxBedrooms: e.target.value })
          }
          style={{ width: "100%" }}
        />
      </div>

      {/* POSTCODE */}
      <label>Postcode:</label>
      <input
        type="text"
        placeholder=""
        value={filters.postcodeArea}
        onChange={(e) =>
          setFilters({ ...filters, postcodeArea: e.target.value })
        }
      />

      {/* DATE */}
      <label>Added Between:</label>
      <input
        type="date"
        value={filters.dateAdded}
        onChange={(e) =>
          setFilters({ ...filters, dateAdded: e.target.value })
        }
      />
      
      <div style={{ marginTop: "8px" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>and</span>
      </div>
      
      <input
        type="date"
        style={{ marginTop: "8px" }}
      />

      <button>Search</button>
    </div>
  );
}

export default SearchForm;