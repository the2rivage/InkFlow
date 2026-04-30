import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm dark:shadow-none">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="inline-block w-24">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-200"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\S+@\S+\.\S+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-200"
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl tracking-wide transition-colors duration-200 mt-2 shadow-md"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}