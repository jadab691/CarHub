import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token"); // login থেকে token

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

  // ================= Delete user =================
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      setUsers(users.filter((user) => user.id !== id)); // update UI
    } catch (err) {
      console.error(err);
      alert("Cannot delete user");
    }
  };

  return (
    <>
    <Navbar/>
      <div className="p-6 pt-20">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Show All Users
        </button>

        {users.length > 0 && (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
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
      <Footer/>
    </>
  );
};

export default AdminProfile;
