import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import axios from "axios";
import { useState, useEffect } from "react";
// import list from "../data/Data";

function Display() {
  const [car, setCar] = useState([]);
  useEffect(() => {
    const getCar = async () => {
      try {
        const res = await axios.get("http://localhost:4001/car");
        console.log(res.data);
        setCar(res.data.filter((data) => data.catagory === "Frontend"));
      } catch (error) {
        console.error("error :", error);
      }
    };
    getCar();
  }, []);
  const filterData = car.filter((data) => data.catagory === "Frontend");
  console.log(filterData);
  var settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="max-w-screen-2xl cntainer mx-auto md:px-20 py-4">
        <h1 className="font-semibold text-xl pb-2">New Arrival</h1>

        <div className="pt-1 pb-10">
          <p>
            Lorem, ipsum dolor. Harum, nam alias. Magni, enim ipsa! Adipisci,
            veniam beatae?
          </p>
        </div>
        {/* card container  */}
        {/* slder container  */}
        <div className="slider-container ">
          <Slider {...settings}>
            {car.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Display;
