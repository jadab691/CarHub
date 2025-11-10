import React from "react";
import list from "../../public/list.json";
import Cars from "../cars/Cars";
import Cards from "./Cards";
import { Link } from "react-router-dom";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ei page er kunu use ar nai . so eita ignore kortesi

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Car() {
  return (
    <>
      <div className="max-w-screen container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Well come to the <span className="text-blue-400">Car</span> section
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            dolorum, deleniti tenetur corrupti deserunt magnam! Velit deserunt
            cum suscipit labore consequatur fugit reprehenderit totam, vel amet
            ipsam aperiam mollitia nobis.
          </p>
          <Link to="/">
            <button className="btn mt-10 bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-600 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-15 grid grid-cols-1 md:grid-cols-3  ">
          {list.map((item) => (
            <Cards key={item.title} item={item} />
          ))}
          {list.map((item) => (
            <Cards key={item.title} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Car;
