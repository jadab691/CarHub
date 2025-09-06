import React from "react";
import Home from "./home/Home";
import Cars from "./cars/Cars";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import CarsProfile from "./components/CarsProfile";
function App() {
  return (
    <div className=" ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars/:id" element={<CarsProfile />} /> {/* new route */}
      </Routes>
    </div>
  );
}

export default App;
