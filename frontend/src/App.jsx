import Home from "./home/Home";
import Cars from "./components/Cars";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Register";
import CarsProfile from "./components/CarsProfile";
import About from "./components/About";
import Login from "./components/Login";
import Profile from "./components/Profile";
import BuySale from "./components/BuySale";
import Buy from "./components/Buy";
import Sale from "./components/Sale";
import Contact from "./components/Contact";
import AdminProfile from "./components/AdminProfile";
import AdminCars from "./components/AdminCars";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/cars/:id" element={<CarsProfile />} /> {/* new route */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buysale" element={<BuySale />}></Route>
        <Route path="/buy" element={<Buy />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminProfile />} />
        <Route path="/admincars" element={<AdminCars />} />
        <Route path="adminlogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
