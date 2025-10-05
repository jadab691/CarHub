import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div
          id="my_modal_3"
          className="   px-2 py-2 border-amber-100  modal modal-open"
        >
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to={"/"}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>

              <div className="mt-4 space-y-2">
                <span>Name</span> <br />
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="outline-none w-80 px-3 py-1 border rounded-md"
                  {...register("text", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">Name is required</span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <span>Email</span> <br />
                <input
                  type="email"
                  placeholder="Enter your @email"
                  className="outline-none w-80 px-3 py-1 border rounded-md"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    Email is required
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <span>Password</span> <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="outline-none w-80 px-3 py-1 border rounded-md"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    Password is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-5">
                <button className="bg-pink-400 text-white rounded-md px-3 py-1  hover:bg-pink-700 duration-200 cursor-pointer">
                  Signup
                </button>
                <p>
                  Already have account?{" "}
                  <Link
                    to="/"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
