import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-center text-lg text-slate-600 mb-6">
            CarHub is your trusted platform to explore, buy, and sell cars with
            ease.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
            Developers
          </h2>

          <div className="space-y-4 rounded-2xl bg-slate-50 p-5 text-slate-700">
            <p className="font-semibold text-slate-900">Amith Chandra Ghosh</p>
            <p>Email: amithchandraghosh@gmail.com</p>
            <p>Phone: 1234567823456</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
