import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Navbar from "./Navbar";

function Search() {
  const [query, setQuery] = useState(""); // user input
  const [results, setResults] = useState([]); // filtered cars
  const [carsData, setCarsData] = useState([]); // all cars
  const navigate = useNavigate(); // React Router navigation

  // Fetch car data from public/list.json
  useEffect(() => {
    fetch("/list.json")
      .then((res) => res.json())
      .then((data) => setCarsData(data));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const cleanedValue = value.trim().toLowerCase();
    if (cleanedValue) {
      const filtered = carsData.filter((car) =>
        car.title.toLowerCase().includes(cleanedValue)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  // Handle click on a car suggestion
  const handleCarClick = (id) => {
    navigate(`/cars/${id}`); // Navigate to CarProfile page
    setQuery(""); // Clear search input
    setResults([]); // Hide suggestions
  };

  return (
    <div className="p-4">
      <div className="relative w-64">
        <label className="input flex items-center border rounded px-2 py-1 w-full">
          <svg
            className="h-[1em] opacity-50 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search by brand..."
            value={query}
            onChange={handleInputChange}
            className="outline-none flex-1"
          />
        </label>

        {/* Display results */}
        {results.length > 0 && (
          <div className="absolute bg-gray-500 border  rounded mt-1 shadow-lg max-h-60 overflow-auto w-full z-50">
            {results.map((car) => (
              <div 
                key={car.id}
                className="p-2 hover:bg-gray-200 cursor-pointer flex  items-center space-x-2"
                onClick={() => handleCarClick(car.id)} // Navigate on click
              >
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{car.title}</p>
                  <p className="text-sm text-gray-500">{car.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
