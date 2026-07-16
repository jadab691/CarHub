import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { apiUrl, imageUrl } from "../api";

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(apiUrl("/admin/all-users"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      alert("Cannot fetch users");
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get(apiUrl("/admin/all-cars"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data.cars || []);
    } catch (err) {
      console.error(err);
      alert("Cannot fetch posted cars");
    }
  };

  const loadDashboard = async () => {
    if (!token) {
      navigate("/adminlogin");
      return;
    }

    setLoading(true);
    await Promise.all([fetchUsers(), fetchCars()]);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, [token, navigate]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(apiUrl(`/admin/delete-user/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Cannot delete user");
      }
    }
  };

  const deleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await axios.delete(apiUrl(`/admin/delete-car/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete car");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/adminlogin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <p className="text-xl">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white p-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400">
                Manage users and all posted cars from one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate("/admin")}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Go to Admin Dashboard
              </button>
              <button
                onClick={loadDashboard}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <p className="text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold">{users.length}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <p className="text-gray-400">Posted Cars</p>
              <p className="text-2xl font-semibold">{cars.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              {users.length === 0 ? (
                <p className="text-gray-400">No users found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="py-2">ID</th>
                        <th className="py-2">Username</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-800">
                          <td className="py-2">{user.id}</td>
                          <td className="py-2">{user.username}</td>
                          <td className="py-2">{user.email}</td>
                          <td className="py-2">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Posted Cars</h2>
              {cars.length === 0 ? (
                <p className="text-gray-400">No posted cars found.</p>
              ) : (
                <div className="space-y-4">
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className="flex flex-col md:flex-row gap-4 bg-gray-800 rounded-lg p-3"
                    >
                      <img
                        src={imageUrl(car.image)}
                        alt={car.name}
                        className="w-full md:w-32 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{car.name}</h3>
                        <p className="text-sm text-gray-400">
                          {car.model || "No model"}
                        </p>
                        <p className="text-green-400">Price: ${car.price}</p>
                        <p className="text-sm text-gray-400">
                          {car.description || "No description"}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded self-start"
                      >
                        Delete Car
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;
