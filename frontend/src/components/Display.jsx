import React from "react";
import list from "../../public/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";

function Display() {
  const filterData = list.filter((data) => data.catagory === "Frontend");
  // console.log(filterData);
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
            {filterData.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Display;
