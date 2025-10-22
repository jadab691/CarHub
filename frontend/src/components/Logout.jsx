import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      
      localStorage.removeItem("Users");
      alert("Logged out successfully!");
    } catch (err) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2  bg-red-400 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
