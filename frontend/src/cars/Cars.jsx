import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Car from "../components/Car";

function Cars() {
  return (
    <>
      <Navbar />
      <div>
        <Car />
      </div>
      <Footer />
    </>
  );
}

export default Cars;
