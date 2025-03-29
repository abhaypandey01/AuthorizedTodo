import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/authSlice";
import authService from "../appwrite/services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "./index";
import Input from "./index";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  // Using React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    setError(null); // Reset previous errors
    try {
      await authService.login({
        email: data.email,
        password: data.password,
      }); // Attempt login
      dispatch(fetchUser()).unwrap(); // Fetch logged-in user details
      navigate("/"); // Redirect to Todos page
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>

        {/* Show error message if exists */}
        {error && (
          <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            bgColor="bg-blue-600 hover:bg-blue-700 w-full"
            disabled={isSubmitting || status === "loading"}
          >
            {isSubmitting || status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Don't have an account?
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
