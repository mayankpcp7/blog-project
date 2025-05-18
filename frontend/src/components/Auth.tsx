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
    <div className="flex items-center p-5 justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white text-[#2c003e]">
        <h2 className="text-3xl font-bold text-center mb-6">
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
              className="w-full p-3 rounded bg-white text-[#2c003e] placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c003e] shadow-sm"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white text-[#2c003e] placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c003e] shadow-sm"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white text-[#2c003e] placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c003e] shadow-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#2c003e] text-white font-semibold py-3 rounded hover:bg-[#39FF14] hover:text-black transition duration-300 shadow-lg"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#2c003e] mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-[#2c003e] font-semibold underline ml-1"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
