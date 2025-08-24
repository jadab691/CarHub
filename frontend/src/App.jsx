import React from "react";
import Home from "./home/Home";
import Cars from "./cars/Cars";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
    </Routes>
  );
}

export default App;
