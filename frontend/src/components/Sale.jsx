import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Sale() {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("model", formData.model);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const token = localStorage.getItem("token"); // JWT from login
      const res = await axios.post("http://localhost:3000/cars/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Car posted successfully!");
      setFormData({
        name: "",
        model: "",
        price: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to post car.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-md mx-auto mt-22 bg-emerald-950 pt-10 mb-20 p-6 border rounded shadow-lg ">
        <h2 className="text-2xl font-bold mb-6">Post Your Car for Sale</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="model"
            placeholder="Car Model/Year"
            value={formData.model}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input className="text-yellow-400 border-2"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Post Car
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Sale;
