import React from "react";
import Jadab from "../../public/jadab.jpg";
import pavel from "../../public/pavel.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col justify-center items-center mt-12 md:mt-5  md:mb-20">
        <div>
          <h1 className="text-4xl font-bold text-center mb-8 mt-20">This is a full stack application made by Amith Chandra Ghosh, A student of CSE , NEUB</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
