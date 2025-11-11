import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Display from "../components/Display";
import Footer from "../components/Footer";

function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Start with 1s white screen
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 1000); // 1s white
    return () => clearTimeout(timer);
  }, []);

  // Trigger fade on video end
  const handleVideoEnd = () => setFadeOut(true);

  // Remove overlay after fade transition + last 1s white
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setLoading(false), 0); // 1s fade to white
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

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
            backgroundColor: "#1b0543ff", // start with white screen
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transition: "opacity .5s ease",
          }}
        >
          {showVideo && (
            <video
              src="/intro.mp4"
              autoPlay
              muted
              onEnded={handleVideoEnd}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          )}
        </div>
      )}

      {!loading && (
        <>
          <Navbar />
          <Banner />
          <Display />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
