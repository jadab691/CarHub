import React from "react";
import { useNavigate } from "react-router-dom";

function AdminID() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  return (
    <>
      <div>
        <div className="text-4xl pb-20">Admins Personal Profile : </div>
        <div className="pt-30">Tootal earning : ........ ........ ........</div>
        <div className="pt-40 pb-15 pl-120 text-red-700">
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div className="pl-120">
          <button onClick={handleLogout}>Admin Logout </button>
        </div>
      </div>
    </>
  );
}

export default AdminID;
