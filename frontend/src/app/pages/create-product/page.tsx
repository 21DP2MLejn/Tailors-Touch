"use client";

import { useState } from "react";
import Navbar from "@/app/components/navbar";
import Link from "next/link";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      setSuccess("Product created successfully");
      setName("");
      setPrice(0);
      setDescription("");
      setImage(null);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-light mb-8 text-gray-800">Create a New Product</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Create Product
            </button>
          </form>
        </div>
        <div className="mt-8 text-center">
          <Link href="/pages/admin" className="text-gray-600 hover:text-gray-800 transition duration-300">
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}