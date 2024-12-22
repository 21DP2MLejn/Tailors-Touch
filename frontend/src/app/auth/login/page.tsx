"use client";
import { use, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(String);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        router.push("/");
        console.log("Login successful:", response.data);
      } else {
        setError("Error: " + (response.data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white w-full sm:w-1/3 rounded-xl p-5 h-auto shadow-xl relative">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="password" className="mb-1 text-sm font-medium">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
          </form>
        </div>
      </div>
    </div>
  );
}