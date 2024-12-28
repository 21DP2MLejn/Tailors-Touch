"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        
        // Check if result contains data and map over products
        const productsWithFullImageUrls = (result.data || result).map(
          (product: Product) => ({
            ...product,
            image: product.image, // Directly use the image URL returned by the backend
          })
        );

        setProducts(productsWithFullImageUrls);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-56 w-full mb-4">
                <img
                  src={product.image} // Directly use the image URL provided by backend
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {product.description.substring(0, 60)}...
              </p>
              <p className="text-blue-600 font-bold text-lg mb-4">
                ${product.price}
              </p>
              <div className="flex space-x-4">
                <Link
                  href={`/pages/nav/products/${product.id}`} // Adjust this according to your Next.js routing
                  className="flex-1 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  View Details
                </Link>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
