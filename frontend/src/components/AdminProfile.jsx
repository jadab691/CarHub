import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ================= Show all users =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
      alert("Cannot fetch users");
    }
  };

  // Fetch users when component mounts
  React.useEffect(() => {
    fetchUsers();
  }, []);

  // ================= Delete user =================
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/admin/delete-user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message); // show backend message
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // update UI
    } catch (err) {
      console.error(err);

      // Show backend message if exists
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Cannot delete user");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <>
      <div className="p-6 pt-20">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Show All Users
        </button>

        <button
          onClick={() => navigate("/admincars")}
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        >
          Delete Posted Cars By Users
        </button>

        <button className="ml-150" onClick={handleLogout}>Admin Logout </button>


        {users.length > 0 && (
          <table className="w-full border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-fuchsia-800 px-4 py-2">ID</th>
                <th className="border text-yellow-400 px-4 py-2">Username</th>
                <th className="border text-teal-400 px-4 py-2">Email</th>
                <th className="border text-red-600 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border text-yellow-400 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border text-teal-400 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-pink-500 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;
