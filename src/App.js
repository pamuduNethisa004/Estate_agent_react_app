import React from "react";
import propertiesData from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Estate Agent Properties</h1>

      <SearchForm />

      {propertiesData.properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default App;
