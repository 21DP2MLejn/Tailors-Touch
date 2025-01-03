"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import {SingleValue} from "react-select";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    country: "",
    phone: "",
    city: "",
    address: "",
    postalcode: "",
  });

  interface CountryOption {
    label: string;
    value: string;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const countryOptions: CountryOption[] = countryList().getData();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleCountryChange = (selectedOption: SingleValue<CountryOption>) => {
    if (selectedOption) {
      setFormData({ ...formData, country: selectedOption.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        router.push("/pages/auth/login");
        console.log("Registration successful:", response.data);
      } else {
        setError("Error: " + (response.data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-accent w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-xl p-8 shadow-xl">
          <h1 className="text-3xl font-light mb-6 text-center text-text">Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text">
                Name:
              </label>
              <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-text">
                Last Name:
              </label>
              <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text">
                Email:
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text">
                Password:
              </label>
              <div className="relative mt-1">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                  ) : (
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-text">
                Confirm Password:
              </label>
              <input
                  type={showPassword ? "text" : "password"}
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder="Confirm your password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-text">
                Country:
              </label>
              <Select
                  options={countryOptions}
                  value={countryOptions.find(option => option.value === formData.country)}
                  onChange={handleCountryChange}
                  className="mt-1"
                  classNamePrefix="react-select"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text">
                Phone Number:
              </label>
              <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-text">
                City:
              </label>
              <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-text">
                Address:
              </label>
              <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>
            <div>
              <label htmlFor="postalcode" className="block text-sm font-medium text-text">
                Postal Code:
              </label>
              <input
                  type="text"
                  name="postalcode"
                  id="postalcode"
                  placeholder="Enter your postal code"
                  value={formData.postalcode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-primary rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                  required
              />
            </div>

            <div>
              <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

          <p className="mt-4 text-center text-sm text-text">
            Already have an account?{" "}
            <Link href="/pages/auth/login" className="font-medium text-primary hover:text-secondary">
              Login
            </Link>
          </p>
        </div>
      </div>
  );
}

