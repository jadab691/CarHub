import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/all-cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data.cars);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cars.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, [token]);

  // Delete car with proper error handling
  const deleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/admin/delete-car/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show backend message (success)
      alert(res.data.message);

      // Remove deleted car from state to update UI
      setCars((prevCars) => prevCars.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);

      // Show backend error message if available
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete car.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 pt-20">
        <h1 className="text-2xl font-bold mb-4">Admin Car Panel</h1>

        {/* Navigation button */}
        <button
          className="text-amber-50 m-5 bg-blue-600 px-3 py-1 rounded"
          onClick={() => navigate("/admin")}
        >
          Admin Dashboard
        </button>

        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          <table className="w-full border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-blue-600 px-4 py-2">ID</th>
                <th className="border text-yellow-400 px-4 py-2">Title</th>
                <th className="border text-green-400 px-4 py-2">Price</th>
                <th className="border text-red-800 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td className="border px-4 py-2">{car.id}</td>
                  <td className="border text-yellow-400 px-4 py-2">{car.name}</td>
                  <td className="border text-green-400 px-4 py-2">{car.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-600 text-red-400 px-3 py-1 rounded"
                      onClick={() => deleteCar(car.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminCars;
