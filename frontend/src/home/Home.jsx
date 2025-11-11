import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Display from "../components/Display";
import Footer from "../components/Footer";

function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Start neon animation for 2s, then fade out
  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000); // after 2s start fade
    const removeTimer = setTimeout(() => setLoading(false), 2500); // total 2.5s
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <h1 className="text-6xl font-bold text-white neon-text">CarHub</h1>

          <style>
            {`
              .neon-text {
                color: #fff;
                text-shadow: 
                  0 0 5px #00ffff,
                  0 0 10px #00ffff,
                  0 0 20px #00ffff,
                  0 0 40px #00ffff,
                  0 0 80px #00ffff;
                animation: flicker 2s ease-in-out forwards;
                letter-spacing: 3px;
              }

              @keyframes flicker {
                0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                  opacity: 1;
                }
                20%, 24%, 55% {
                  opacity: 0.2;
                }
              }
            `}
          </style>
        </div>
      )}

      {!loading && (
        <>
          <div className=" max-h-fit w-full">
            <Navbar />
            <Banner />
            <Display />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
