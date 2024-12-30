"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import axios from "axios";

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
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/products", {
          headers: authToken
            ? {
                Authorization: `Bearer ${authToken}`,
              }
            : undefined,
        });

        const productsWithFullImageUrls = response.data.data.map(
          (product: Product) => ({
            ...product,
            image: product.image,
          })
        );

        setProducts(productsWithFullImageUrls);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId: number) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.post(`http://127.0.0.1:8000/api/cart`, 
        { product_id: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Product added to cart successfully!");
    } catch (err) {
      setError("Failed to add product to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-light text-gray-600">Loading collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-light text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-extralight mb-12 text-center text-gray-800">
          Our Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-w-1 aspect-h-1 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </div>
              <h2 className="text-lg font-light text-gray-800 mb-1">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {product.description.substring(0, 60)}...
              </p>
              <p className="text-gray-700 font-light mb-4">${product.price}</p>
              <div className="flex space-x-4">
                <Link
                  href={`/pages/nav/products/${product.id}`}
                  className="flex-1 text-center border border-gray-300 text-gray-600 py-2 px-4 hover:bg-gray-100 transition duration-300"
                >
                  View Details
                </Link>
                <button
                  className="flex-1 bg-gray-900 text-white py-2 px-4 hover:bg-gray-800 transition duration-300"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}