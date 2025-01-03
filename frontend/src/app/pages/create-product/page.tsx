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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-h1 font-light mb-8">Create a New Product</h1>
        <div className="max-w-md mx-auto border border-secondary bg-background p-8 rounded-lg drop-shadow-lg">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium ">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="mt-1 block w-full border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                className="mt-1 block w-full text-sm
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-background file:text-text
                file:border file:border-secondary
                transition duration-300
                file:cursor-pointer duration-200
                hover:file:bg-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-secondary bg-primary py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 transition duration-300  focus:ring-secondary focus:ring-offset-2"
            >
              Create Product
            </button>
          </form>
        </div>
        <div className="mt-8 text-center">
          <Link href="/pages/admin" className=" hover:text-primary transition duration-300">
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}