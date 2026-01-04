import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminProfile from "./AdminProfile";
import { Navigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [userCars, setUserCars] = useState([]); // posted cars
  const [boughtCars, setBoughtCars] = useState([]); // bought cars

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user info
    axios
      .get("http://localhost:3000/auth/home", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userId = res.data.user.id;
        setUser(res.data.user);

        // Fetch user's posted cars
        axios
          .get(`http://localhost:3000/cars/user/${userId}`)
          .then((res) => setUserCars(res.data))
          .catch((err) => console.error(err));

        // Fetch user's bought cars
        axios
          .get(`http://localhost:3000/cars/buys/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setBoughtCars(res.data))
          .catch((err) => console.error("Failed to fetch bought cars:", err));
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleHome = () => navigate("/");

  if (!user)
    return <p className="text-center mt-10 text-white text-xl">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="relative">
        <div className="absolute top-4 left-31 mb-4 flex items-center gap-4">
          <p className="text-white text-sm">{user.email}</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-4 right-4 mb-4 flex items-center gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-red-500 px-4 py-1 rounded-md transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="min-h-screen mt-20 bg-gray-900 flex flex-col items-center p-4">
        {/* Profile Card */}
        <div className="relative">
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
            Profile
          </h2>
        </div>

        {/* User’s Posted Cars */}
        <div className="max-w-5xl w-full mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Your Posted Cars
          </h2>
          {userCars.length === 0 ? (
            <p className="text-gray-300">You haven’t posted any cars yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#081f28] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={`http://localhost:3000/uploads/${car.image}`}
                    alt={car.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {car.name}
                    </h3>
                    <p className="text-gray-300 mb-1">{car.model}</p>
                    <p className="font-semibold text-green-400 mb-2">
                      Price: ${car.price}
                    </p>
                    <p className="text-gray-200 mb-2 line-clamp-3">
                      {car.description}
                    </p>

                    {/* Delete Button */}
                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded-md mt-2 transition"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this car?"
                          )
                        ) {
                          try {
                            const token = localStorage.getItem("token");
                            await axios.delete(
                              `http://localhost:3000/cars/${car.id}`,
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            setUserCars(
                              userCars.filter((c) => c.id !== car.id)
                            );
                          } catch (err) {
                            console.error("Failed to delete car:", err);
                            alert(
                              err.response?.data?.message ||
                                "Failed to delete car"
                            );
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User’s Bought Cars */}
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">
            Cars You Bought
          </h2>
          {boughtCars.length === 0 ? (
            <p className="text-gray-300">You haven’t bought any cars yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {boughtCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#081f28] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={`http://localhost:3000/uploads/${car.image}`}
                    alt={car.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {car.name}
                    </h3>
                    <p className="text-gray-300 mb-1">{car.model}</p>
                    <p className="font-semibold text-green-400 mb-2">
                      Price: ${car.price}
                    </p>
                    <p className="text-gray-200 mb-2 line-clamp-3">
                      {car.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Seller: {car.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
