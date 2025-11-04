import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Login() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // for navigation after login

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send data to server
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );

      if (response.status === 201) {
        // ✅ fixed typo here
        localStorage.setItem("token", response.data.token); // store token
        localStorage.setItem("name", response.data.name); //store name in the local_storage
        navigate("/"); // ✅ navigate to home
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 px-8 py-6 border rounded-lg shadow-lg">
          {" "}
          {/* ✅ fixed py-6 */}
          <h2 className="text-2xl font-bold mb-6 text-red-500 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-3 py-2 border rounded"
                name="email"
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-3 py-2 border rounded"
                name="password"
                onChange={handleChanges}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-700 text-white py-2 rounded hover:bg-pink-800"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
