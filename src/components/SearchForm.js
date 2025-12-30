import React from "react";

function SearchForm() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Search Properties</h2>

      <div>
        <label>Property Type: </label>
        <select>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      <div>
        <label>Min Price: </label>
        <input type="number" placeholder="Min price" />
      </div>

      <div>
        <label>Max Price: </label>
        <input type="number" placeholder="Max price" />
      </div>

      <div>
        <label>Min Bedrooms: </label>
        <input type="number" placeholder="Min bedrooms" />
      </div>

      <div>
        <label>Max Bedrooms: </label>
        <input type="number" placeholder="Max bedrooms" />
      </div>

      <div>
        <label>Date Added After: </label>
        <input type="date" />
      </div>

      <div>
        <label>Postcode Area: </label>
        <input type="text" placeholder="e.g. BR5" />
      </div>
    </div>
  );
}

export default SearchForm;
