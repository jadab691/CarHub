import React, { useRef } from "react";
import Car1RemoveBG from "../../public/car1-removedBG.png";
import Car1 from "../../public/car1.jpg";
import carhub from "../../public/carhub.jpg";

function Banner() {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // Increased range: from ±20 → ±40 for looser movement
    const x = ((e.clientX - left) / width - 0.5) * 40;
    const y = ((e.clientY - top) / height - 0.5) * 40;
    imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`; // added a slight zoom
  };

  const resetPosition = () => {
    imgRef.current.style.transform = "translate(0px, 0px) scale(1)";
  };

  return (
    <>
      <div className="max-w-screen-2xl pt-10 container mx-auto md:px-20 px-4 flex flex-col md:flex-row md:mt-5 md:mb-20">
        {/* Left side text */}
        <div className="w-full md:w-1/2 order-2 md:order-0 mt-12 mb-25 md:mt-25">
          <h1 className="text-4xl font-bold mb-5">
            Hello , Welcome to the <span className="text-gray-400">Car</span>
            <span className="text-yellow-400 mb-4">Hub</span> <br />
            <span className="text-[#FF7ED4] text-2xl font-light">
              Here you can find the best cars available in the market.
            </span>{" "}
            <br />
            <span className="text-red-300 font-normal">Sell </span>or{" "}
            <span className="text-green-400 font-normal">Buy </span>
            <span className="text-blue-500 font-normal">it</span>
          </h1>

          <p className="text-sm text-gray-400 mb-12">
            "Welcome to CarHub, where your journey begins the moment you step
            into the driver’s seat. Explore a wide collection of cars crafted
            for every lifestyle—whether you seek luxury, performance, or the
            perfect daily ride. Each car tells a story of adventure, freedom,
            and excitement, waiting for you to take the wheel. Find your dream
            car, experience the thrill of driving, and let every mile be a
            memory. At CarHub, it’s more than just cars—it’s the start of your
            next great journey."
          </p>
        </div>

        {/* Right side image (looser floating effect) */}
        <div
          className="w-full md:w-1/2 ml-10 rounded-2xl mt-2.5 flex justify-center flex-col items-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetPosition}
        >
          <img
            ref={imgRef}
            src={carhub}
            alt="CarHub"
            className="order-1 bg-transparent rounded-tl-full rounded-br-full transition-transform duration-500 ease-out"
          />
          <br />
        </div>
      </div>
      <hr />
    </>
  );
}

export default Banner;
