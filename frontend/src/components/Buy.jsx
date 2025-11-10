import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:3000/cars");
        setCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-screen-2xl mx-auto mt-30 px-4 md:px-20 ">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-200 text-center mb-10">
          Available Cars
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-[#092635] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={`http://localhost:3000/uploads/${car.image}`}
                alt={car.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-1 hover:text-pink-400 cursor-pointer">
                  {car.name}
                </h2>
                <p className="text-gray-300 mb-1">{car.model}</p>
                <p className="font-semibold text-green-400 mb-2">
                  Price: ${car.price}
                </p>
                <p className="text-gray-200 mb-2 line-clamp-3">
                  {car.description}
                </p>
                <p className="text-sm text-gray-500">
                  Posted by: {car.username}
                </p>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded-md mt-2 transition"
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Do you want to buy ${car.name} for $${car.price}?`
                      )
                    ) {
                      try {
                        const token = localStorage.getItem("token");
                        await axios.post(
                          `http://localhost:3000/cars/buy/${car.id}`,
                          {},
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );

                        alert("Car bought successfully!");
                        setCars(cars.filter((c) => c.id !== car.id)); // remove from UI
                      } catch (err) {
                        console.error("Failed to buy car:", err);
                        alert(
                          err.response?.data?.message || "Failed to buy car"
                        );
                      }
                    }
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cars;
