import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Buy() {
  return (
    <>
      <Navbar />

      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-12 md:mt-5  md:mb-20 ">
        <div className="w-full md:w-1/2 order-2 md:order-0 mt-12 mb-25 md:mt-25">
          Sale
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Buy;
