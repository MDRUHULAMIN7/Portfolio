"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/app/actions";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await login(formData);

      if (!!response.error) {
        setError(response.error);
      } else {
        const cb = searchParams.get("callbackUrl");
        router.push(cb || "/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-[#0d1622] absolute p-10 shadow-lg rounded-2xl border border-[#2c3e57]">
      <h2 className="text-2xl font-bold text-[#93c5fd] text-center mb-8">Please Login</h2>

      {error && (
        <div className="text-xl text-red-500 text-center mb-4">{error}</div>
      )}

      <form className="login-form space-y-7" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email" className="block mb-3 text-left text-[#93c5fd]">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#e0f2fe] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57] font-serif"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block mb-3 text-left text-[#93c5fd]">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-[#2c3e57] rounded-md bg-transparent text-[#c9e7fc] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2c3e57] font-serif"
          />
          <span
            className="absolute right-4 top-[74%] transform -translate-y-1/2 text-xl text-[#0d1622] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 flex justify-center items-center gap-2 cursor-pointer bg-[#2c3e57] text-white rounded-md font-bold hover:bg-[#1d2d45] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
