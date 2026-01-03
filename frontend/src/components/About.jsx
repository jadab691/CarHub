import React from "react";
import Jadab from "../../public/jadab.jpg";
import pavel from "../../public/pavel.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col justify-center items-center md:flex-row mt-12 md:mt-5  md:mb-20">
        <div className="w-full  md:w-1/2 order-2 md:order-0 mt-12 mb-25 md:mt-25 flex-row items-center justify-center">
          <div className="text-4xl text-indigo-400  ">
            <h1>Jadab Lal Sarkar</h1>
          </div>
          <img
            src={Jadab}
            className=" border-gray-900 rounded-3xl border-8  object-cover shadow shadow-red-500 h-70  "
            alt=""
          />
          <p>
            we dont share personal details(Vibe coder)
          </p>
        </div>

        <div className="w-full md:w-1/2 order-2 md:order-0 mt-12 mb-25 md:mt-25">
          <div className="text-4xl text-indigo-400  ">
            <h1>Pm Mahmud</h1>
          </div>
          <img
            src={pavel}
            className=" border-gray-900 rounded-3xl border-8  object-cover shadow shadow-red-500 h-70  "
            alt=""
          />
          <p>
            we dont share personal details(Vibe coder)
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
