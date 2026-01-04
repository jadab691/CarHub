import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Register() {
  const navigate = useNavigate(); //for navigation after registration
  const gotoLogin = () => {
    navigate("/Login");
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //send data to server
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        values
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(values);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 px-8 py - 6 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700"></label>
              <input
                type="text"
                placeholder="Enter UserName"
                className="w-full px-3 py-6 border"
                name="username"
                onChange={handleChanges}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700"></label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-3 py-6 border"
                name="email"
                onChange={handleChanges}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-3 py-3 border rounded-md"
                required
                minLength={8}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                title="Password must be at least 8 characters long and include uppercase, lowercase, and a number."
                onChange={handleChanges}
              />
            </div>

            <button
              className="w-full bg-green-600 text-white py-2 cursor-pointer"
              // onClick={gotoLogin}
            >
              Submit
            </button>
          </form>
          <div>
            <span>Already have account ? </span>
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
