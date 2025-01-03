"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import Footer from "@/app/components/footer";
import axios from "axios";
import Image from 'next/image';

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
      if (response.data && Array.isArray(response.data.data)) {
        setCartItems(response.data.data);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
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
      fetchCartItems();
    } catch (err) {
      console.error("Error updating cart item:", err);
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
      fetchCartItems();
    } catch (err) {
      console.error("Error removing cart item:", err);
      setError("Failed to remove cart item. Please try again.");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const itemPrice = item?.price || 0;
    return sum + itemPrice * (item.quantity || 1);
  }, 0);

  if (cartItems.length === 0 && !error) {
    return (
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto py-16 px-4">
            <h1 className="text-h1 font-light mb-8 ">Shopping Cart</h1>
            <p className="">Your cart is empty.</p>
          </div>
          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-h1 font-light mb-8 ">Shopping Cart</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="space-y-8">
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-accent pb-4">
                  <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.name || "Product"} image`}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover border border-secondary"

                  />
                  <div className="flex-grow">
                    <h3 className="text-h3 font-light">{item.name || "Unknown Product"}</h3>
                    <p className="text-p">${(Math.round(item.price * 100) / 100).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className=" hover:text-secondary mx-2"
                        aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="text-button mx-2">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className=" hover:text-secondary mx-2"
                        aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
            ))}
            <div className="flex justify-between items-center pt-4">
              <span className="text-xl font-light ">Total: ${total.toFixed(2)}</span>
              <button className="bg-primary border border-secondary py-2 px-6 hover:bg-accent transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/pages/nav/products" className=" hover:text-primary transition duration-300">
              ← Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
  );
}
