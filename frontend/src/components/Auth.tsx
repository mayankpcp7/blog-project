import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${isSignUp ? "signup" : "signin"}`,
        formData
      );

      const token = response.data.jwt;
      localStorage.setItem("token", token);
      navigate("/Blogs");
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Authentication failed. Please check your credentials.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest();
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-print text-white p-8  drop-shadow-[0_0_10px_#ffff] rounded-2xl shadow-2xl border border-[#39FF14]">
        <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-[0_0_10px_#ffff]">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-zinc-900 text-white placeholder-[#39FF14] border border-white focus:outline-none focus:ring-2 focus:ring-[#39FF14] shadow-[0_0_10px_#ffff]"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-900 text-white placeholder-[#39FF14] border border-[#39FF14] focus:outline-none focus:ring-2 focus:ring-[#39FF14] shadow-[0_0_10px_#ffff]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-900 text-white placeholder-[#39FF14] border border-[#39FF14] focus:outline-none focus:ring-2 focus:ring-[#39FF14] shadow-[0_0_10px_#ffff]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#39FF14] hover:bg-[#2aff10] text-black py-3 rounded font-semibold transition duration-300 shadow-[0_0_20px_#39FF14]"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-white mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-white hover:underline ml-1"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
