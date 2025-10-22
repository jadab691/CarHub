import React from "react";
import Display from "./Display";

function Cards({ item }) {
  // console.log(item);
  return (
    <>
      <div className="pb-3 hover:scale-105 duration-300">
        <div className="card bg-gray-800 h-96 w-85 shadow-sm shadow-gray-700 hover:shadow-lime-50 ">
          <figure>
            <img
              className="h-48 w-full hover:scale-110 transition-all duration-300 ease-in-out"
              src={item.image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-[#092635]">
            <h2 className="card-title hover:text-[#FF7ED4] cursor-pointer hover:scale-97 transition-all duration-300 ease-out ">
              {item.title}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{item.discription}</p>
            <div className="card-actions justify-end ">
              <div className="badge badge-outline cursor-pointer hover:bg-blue-400 hover:scale-110 transition-all duration-75 ease-in">
                See More
              </div>
              <div className="badge badge-outline cursor-pointer hover:bg-red-400 hover:scale-110 transition-all duration-75 ease-in">
                Add To Fav
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
