import React from "react";
import Car1RemoveBG from "../../public/car1-removedBG.png";
import Car1 from "../../public/car1.jpg";
import carhub from "../../public/carhub.jpg";

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl pt-10 container mx-auto md:px-20 px-4 flex flex-col md:flex-row  md:mt-5  md:mb-20 ">
        <div className="w-full md:w-1/2 order-2 md:order-0 mt-12 mb-25 md:mt-25">
          <h1 className="text-4xl font-bold mb-5">
            Hello , Welcome to the <span className="text-gray-400">Car</span>
            <span className="text-yellow-400 mb-4">Hub</span> <br />
            <span className="text-[#FF7ED4] text-2xl font-light">
              here you can find the best cars available in the market.
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
        <div className="w-full md:w-1/2 ml-10 rounded-2xl mt-2.5 flex justify-center flex-col items-center">
          <img
            src={carhub}
            className="order-1 bg-transparent hover:scroll-m-10 rounded-tl-full duration-600 rounded-br-full hover:rounded-tl-none"
            alt=""
          />
          <br />
        </div>
      </div>
      <hr />
    </>
  );
}

export default Banner;
