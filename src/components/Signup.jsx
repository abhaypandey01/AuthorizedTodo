import React, { useState } from "react";
import authservice from "../appwrite/services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, InputBox } from "./index";
import { login as storeLogin } from "../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authservice.createAccount({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (userData) {
        const userdata = await authservice.getcurrentuser(userData);
        if (userdata) {
          dispatch(storeLogin(userdata));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>

        {/* Show error message if exists */}
        {error && (
          <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(create)}>
          <InputBox
            type="text"
            label="Name"
            placeholder="Enter Full Name"
            {...register("name", {
              required: "Fullname is required",
            })}
          />
          <InputBox
            type="email"
            label="Email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <InputBox
            type="password"
            label="Password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Create Account
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
