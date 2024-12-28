"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const result = await response.json();
        
        // Check if result contains data and set the product
        const productData = result.data || result;
        setProduct({
          ...productData,
          image: productData.image, // Directly use the image URL returned by the backend
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading product details...</p>
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

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Product not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover md:w-64"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{product.description}</p>
              <p className="text-blue-600 font-bold text-2xl mb-6">${product.price}</p>
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/pages/nav/products"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </>
  );
}
