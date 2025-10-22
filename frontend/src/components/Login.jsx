import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );

      console.log(res.data);
      if (res.data) {
        // Save user info first
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        // Then alert and close modal
        alert("Login successful!");
        document.getElementById("my_modal_3").close();
      }
    } catch (err) {
      if (err.response) {
        console.error(
          "Login failed, error details:",
          err.response.data.message
        );
        alert(err.response.data.message);
      } else {
        console.error("Login failed:", err.message);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close button */}
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_3").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              X
            </button>

            <h3 className="font-bold text-lg">Login</h3>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span> <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="outline-none w-80 px-3 py-1 border rounded-md"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span> <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="outline-none w-80 px-3 py-1 border rounded-md"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password is required
                </span>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-around mt-5">
              <button
                type="submit"
                className="bg-pink-400 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 cursor-pointer"
              >
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
