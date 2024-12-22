"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Tailor&apos;s Touch
        </Link>
        <nav className={`flex-1 flex items-center justify-end gap-8 md:flex ${menuOpen ? "block" : "hidden"} md:block`}>
          <Link href="/categories/men" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Men
          </Link>
          <Link href="/categories/women" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Women
          </Link>
          <Link href="/categories/accessories" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Accessories
          </Link>
          <Link href="/categories/sale" className="text-red-500 font-semibold dark:text-red-400 hover:underline">
            Sale
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md py-1 px-5 ml-5 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 absolute right-0 mx-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Link href="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3.6-7H5.4M7 13L5.4 6M7 13l-2 8m12-8l2 8m-6 0a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
              >
                Logout
              </button>
              <Link href="/profile" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 13.5a3.75 3.75 0 01-7.5 0m7.5 0a3.75 3.75 0 00-7.5 0m7.5 0H21a2.25 2.25 0 01-2.25 2.25m0 0H5.25m0 0A2.25 2.25 0 013 13.5h3.75m12-7.5a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                Register
              </Link>
            </div>
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
