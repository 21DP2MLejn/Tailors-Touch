"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import Footer from "@/app/components/footer";
import axios from "axios";

type CartItem = {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setCartItems(response.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items. Please try again.");
    }
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/cart/${id}`, 
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      fetchCartItems(); // Refresh cart items after update
    } catch (error) {
      console.error("Error updating cart item:", error);
      setError("Failed to update cart item. Please try again.");
    }
  };

  const removeItem = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchCartItems(); // Refresh cart items after deletion
    } catch (error) {
      console.error("Error removing cart item:", error);
      setError("Failed to remove cart item. Please try again.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-3xl font-light mb-8 text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-light mb-8 text-gray-800">Shopping Cart</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="flex-grow">
                <h2 className="text-lg font-light text-gray-800">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-700">-</button>
                <span className="text-gray-800">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-700">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-light text-gray-800">Total: ${total.toFixed(2)}</span>
            <button className="bg-gray-900 text-white py-2 px-6 hover:bg-gray-800 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/pages/nav/products" className="text-gray-600 hover:text-gray-800 transition duration-300">
            ← Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
