import React from "react";

function SearchForm({ filters, setFilters }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Search Properties</h2>

      <div>
        <label>Property Type: </label>
        <select name="type" onChange={handleChange}>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      <div>
        <label>Min Price: </label>
        <input type="number" name="minPrice" onChange={handleChange} />
      </div>

      <div>
        <label>Max Price: </label>
        <input type="number" name="maxPrice" onChange={handleChange} />
      </div>

      <div>
        <label>Min Bedrooms: </label>
        <input type="number" name="minBedrooms" onChange={handleChange} />
      </div>

      <div>
        <label>Max Bedrooms: </label>
        <input type="number" name="maxBedrooms" onChange={handleChange} />
      </div>

      <div>
        <label>Date Added After: </label>
        <input type="date" name="dateAdded" onChange={handleChange} />
      </div>

      <div>
        <label>Postcode Area: </label>
        <input type="text" name="postcodeArea" onChange={handleChange} />
      </div>
    </div>
  );
}

export default SearchForm;
