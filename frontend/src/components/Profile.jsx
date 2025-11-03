import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:3000/auth/home", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/"); // navigate to home page
  };

  if (!user) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4 relative">
      {/* Home Button */}
      <button
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md transition"
        onClick={handleHome}
      >
        Home
      </button>

      <div className="bg-gray-800 rounded-xl p-8 max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Profile
        </h2>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-1">Name</label>
          <p className="p-3 rounded-md bg-gray-700 text-white">
            {user.username}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-semibold mb-1">
            Email
          </label>
          <p className="p-3 rounded-md bg-gray-700 text-white">{user.email}</p>
        </div>

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
