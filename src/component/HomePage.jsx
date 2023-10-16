import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";

const HomePage = () => {
  const cabCategories = useSelector((state) => state.car.data);
  // Extract unique categories using Set
  const uniqueCategories = [
    ...new Set(cabCategories.map((car) => car.category)),
  ];
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState({
    pickupLocation: "",
    dropOffLocation: "",
    selectedCategory: "",
  });

  const [filteredResults, setFilteredResults] = useState([]); // New state for search results

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchResults({ ...searchResults, [name]: value });
  };

  const handleSearch = () => {
    const { pickupLocation, dropOffLocation, selectedCategory } = searchResults;
    const filteredCategories = cabCategories.filter((category) => {
      return (
        (pickupLocation === "" ||
          category.pickupLocation.includes(pickupLocation)) &&
        (dropOffLocation === "" ||
          category.dropOffLocation.includes(dropOffLocation)) &&
        (selectedCategory === "" || category.category === selectedCategory)
      );
    });
    setFilteredResults(filteredCategories);
    setSearched(true);
  };

  const handleCancel = () => {
    setSearched(false);
    setFilteredResults([]);
    setSearchResults({
      pickupLocation: "",
      dropOffLocation: "",
      selectedCategory: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Search a Cab</h1>
        <div className="mb-4">
          <input
            name="pickupLocation"
            type="text"
            id="pickupLocation"
            value={searchResults.pickupLocation}
            onChange={handleInputChange}
            placeholder="Enter Pickup Location"
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            name="dropOffLocation"
            type="text"
            value={searchResults.dropOffLocation}
            id="dropOffLocation"
            onChange={handleInputChange}
            placeholder="Enter Drop-off Location"
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <select
            id="category"
            name="selectedCategory"
            value={searchResults.selectedCategory}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => handleSearch()}
          >
            Search
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Available Cab Categories:</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-2">
          {searched
            ? filteredResults.map((category) => (
                <Link
                  to={`/car/${category.id}`}
                  key={category.id}
                  className="mr-4"
                >
                  <div className="bg-gray-100 rounded-lg shadow-md">
                    <img
                      src={category.img}
                      alt={`Image of ${category.type} car`}
                      className="w-full h-50 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              ))
            : cabCategories.map((category) => (
                <Link
                  key={category.id}
                  className="mr-4"
                  to={`/car/${category.id}`}
                >
                  <div className="bg-gray-100 rounded-lg  shadow-md">
                    <img
                      src={category.img}
                      alt={`Image of ${category.type} car`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                </Link>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
