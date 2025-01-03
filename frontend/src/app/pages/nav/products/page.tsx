"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import axios from "axios";
import { addToCart } from "@/app/utils/cart";
import Image from "next/image";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

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

            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
        } catch (err) {
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId: number) => {
        try {
            await addToCart(productId, 1);
            console.log("Product added to cart successfully!");
        } catch (error) {
            alert("Failed to add product to cart. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-h3 font-light">Loading collection...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-light text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mx-auto py-16 px-4">
                <h1 className="text-h1 font-extralight mb-12 text-center text-text">
                    Our Collection
                </h1>

                <div className="mb-8 flex flex-wrap justify-center gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="w-full max-w-xs p-4 border border-secondary rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out"
                            >
                                <div className="relative aspect-w-1 aspect-h-1 mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <h2 className="font-medium text-text mb-1">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-text mb-2">
                                    {product.description.substring(0, 40)}...
                                </p>
                                <p className="text-lg font-semibold text-primary mb-4">
                                    ${Math.round(product.price).toFixed(2)}
                                </p>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/pages/nav/products/${product.id}`}
                                        className="flex-1 text-center border border-primary text-sm py-1 rounded hover:bg-primary transition"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        className="flex-1 bg-primary text-sm py-1 rounded hover:bg-secondary transition"
                                    >
                                        To cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
