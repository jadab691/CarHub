import React from "react";
import { Link } from "react-router-dom";


function Login() {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Login</h3>

          <div className="mt-4 space-y-2">
            <span>Email</span> <br />
            <input
              type="email"
              placeholder="Enter your @email"
              className="outline-none w-80 px-3 py-1 border rounded-md"
            />
          </div>
          <div className="mt-4 space-y-2">
            <span>Password</span> <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="outline-none w-80 px-3 py-1 border rounded-md"
            />
          </div>
          {/* Button */}
          <div className="flex justify-around mt-5">
            <button className="bg-pink-400 text-white rounded-md px-3 py-1  hover:bg-pink-700 duration-200 cursor-pointer">
              Login
            </button>
            <p className="">
              Not registered?{" "}
              <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
