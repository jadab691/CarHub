import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BuySale() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 py-20">
        <h1 className="text-4xl md:text-5xl text-slate-900 font-bold mb-10 text-center">
          What would you like to do today?
        </h1>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div
            className="flex-1 rounded-3xl border border-slate-200 bg-white p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition duration-300 cursor-pointer"
            onClick={() => navigate("/buy")}
          >
            <div className="text-3xl mb-4">💰</div>
            <div className="text-xl font-semibold text-slate-900">
              Buy a car
            </div>
            <div className="mt-3 text-slate-600">
              Find your dream car and make it yours today.
            </div>
          </div>

          <div
            className="flex-1 rounded-3xl border border-slate-200 bg-white p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition duration-300 cursor-pointer"
            onClick={() => navigate("/sale")}
          >
            <div className="text-3xl mb-4">🚗</div>
            <div className="text-xl font-semibold text-slate-900">
              Sell a car
            </div>
            <div className="mt-3 text-slate-600">
              List your vehicle easily and reach the right buyers.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuySale;
