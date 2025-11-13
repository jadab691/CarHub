import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        {/* Logo */}

        {/* Description */}
        <p className="text-cyan-400 text-center text-lg max-w-md mb-8 neon-text">
          CarHub is your ultimate platform to explore, buy, and sell cars with
          ease.
        </p>

        {/* Developers */}
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-neon w-full max-w-md">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center neon-text">
            Developers
          </h2>

          <div className="space-y-4">
            <div className="text-gray-300 neon-text">
              <p className="font-semibold">Jadab Sarkar</p>
              <p>Email: jadab@example.com</p>
              <p>Phone: +880 1234 567890</p>
            </div>
            <div className="text-gray-300 neon-text">
              <p className="font-semibold">Another Dev</p>
              <p>Email: dev2@example.com</p>
              <p>Phone: +880 9876 543210</p>
            </div>
          </div>
        </div>

        {/* Neon glow effect */}
        <style>
          {`
          .neon-text {
            text-shadow: 
              0 0 5px #00ffff,
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 40px #0ff,
              0 0 80px #0ff;
          }

          .shadow-neon {
            box-shadow: 
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 30px #0ff;
          }
        `}
        </style>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
