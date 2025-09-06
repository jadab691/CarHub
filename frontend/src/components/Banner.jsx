import React from "react";
import Car1RemoveBG from "../../public/car1-removedBG.png";
import Car1 from "../../public/car1.jpg";

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-12 md:mt-5  md:mb-20 ">
        <div className="w-full md:w-1/2 order-2 md:order-0 mt-12 mb-25 md:mt-25">
          <div className="space-y-2 ">
            <h1 className="text-4xl font-bold mb-5">
              Hello , Welcome to the <span className="text-gray-400">Car</span>
              <span className="text-yellow-400 mb-4">Hub</span> <br />
              <span className="text-gray-500 text-2xl font-light">
                here you can find the best cars available in the market.
              </span>{" "}
              <br />
              <span className="text-red-300 font-normal">Sell </span>{" "}
              <span className="text-green-400 font-normal">Buy </span> or{" "}
              <span className="text-blue-500 font-normal">Rent it</span>
            </h1>
            <p className="text-xl mb-12">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              delectus laudantium recusandae saepe accusantium modi ullam
              deleniti, impedit deserunt veniam laboriosam quae eos fugiat? Esse
              corporis magnam cumque aut perspiciatis!
            </p>
            <label className="input validator ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill=""
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <button className="btn btn-soft  btn-secondary">Secondary</button>
        </div>
        <div className="w-full md:w-1/2 ml-10 rounded-2xl mt-2.5 flex justify-center flex-col items-center">
          <img
            src={Car1}
            className="order-1 bg-transparent hover:scroll-m-10 rounded-tl-full duration-600 hover:rounded-br-full hover:rounded-tl-none"
            alt=""
          />
          <br />
        </div>
      </div>
    </>
  );
}

export default Banner;
