import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Car from "../components/Car";
import list from "../../public/list.json"

function Cars() {
  return (
    console.log(list),
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Car />
      </div>
      <Footer />
    </>
  );
}

export default Cars;
