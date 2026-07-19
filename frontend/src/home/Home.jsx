import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Display from "../components/Display";
import Footer from "../components/Footer";

function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000);
    const removeTimer = setTimeout(() => setLoading(false), 2500);
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
            backgroundColor: "#f8fafc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
              CarHub
            </h1>
            <p className="mt-3 text-slate-600">Loading your next ride…</p>
          </div>
        </div>
      )}

      {!loading && (
        <div>
          <Navbar />
          <Banner />
          <Display />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
