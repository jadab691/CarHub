import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function CarsProfile() {
  const { id } = useParams(); // get the id from URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch("/list.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedCar = data.find((c) => c.id === id);
        setCar(selectedCar);
      });
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <>
      <div className="p-4">
        <Navbar />
        <div className="p-20 mt-20 md:ml-100   ">
          <h1 className="text-2xl font-bold text-blue-300">{car.title}</h1>
          <img  src={car.image} alt={car.title} className="w-96 mt-4 rounded-md border-amber-200 bg-amber-400" />
          <p className="mt-2 text-pink-400">Price: {car.price}</p>
          <p className="mt-2 text-cyan-500">{car.discription}</p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CarsProfile;
