import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BuySale() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div
      className="min-h-screen flex flex-col items-center justify-center 
        text-gray-400 "
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center drop-shadow-lg">
        What do you want to do?
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Buy Card */}
        <div
          className=" bg-black text-purple-700 font-bold rounded-2xl shadow-2xl hover:scale-105 transform  transition duration-300 flex flex-col items-center justify-center p-12 cursor-pointer"
          onClick={() => {
            navigate("/buy");
          }}
        >
          <div className="text-3xl mb-4">💰 Buy</div>
          <div className="text-center text-purple-500">
            Find your dream car and make it yours today!
          </div>
        </div>

        {/* Sale Card */}
        <div
          className="bg-black text-pink-600 font-bold rounded-2xl shadow-2xl hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center p-12 cursor-pointer"
          onClick={() => {
            navigate("/sale");
          }}
        >
          <div className="text-3xl mb-4">🚗 Sale</div>
          <div className="text-center text-pink-500">
            Sell your car easily and get the best price!
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default BuySale;
