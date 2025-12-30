import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import propertiesData from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateAdded: "",
    postcodeArea: "",
  });

  const filteredProperties = propertiesData.properties.filter((property) => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    if (filters.minBedrooms && property.bedrooms < Number(filters.minBedrooms)) return false;
    if (filters.maxBedrooms && property.bedrooms > Number(filters.maxBedrooms)) return false;
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ padding: "20px" }}>
            <h1>Estate Agent Properties</h1>

            <SearchForm filters={filters} setFilters={setFilters} />

            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        }
      />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}

export default App;
