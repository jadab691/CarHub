import React from "react";
import Home from "./home/Home";
import Cars from "./cars/Cars";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import CarsProfile from "./components/CarsProfile";
import About from "./components/About";
import { useAuth } from "./context/AuthProvider.jsx";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <div className="dark:bg-slate-900 dark:text-white ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cars"
          element={authUser ? <Cars /> : <Navigate to="/signup" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars/:id" element={<CarsProfile />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
