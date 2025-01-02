"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import axios from "axios";
import { addToCart } from '@/app/utils/cart';
import Image from 'next/image'

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
                const authToken = localStorage.getItem("authToken");
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${params.id}`, {
                    headers: authToken
                        ? {
                            Authorization: `Bearer ${authToken}`,
                        }
                        : undefined,
                });

                const productData = response.data.data;
                setProduct({
                    ...productData,
                    image: productData.image,
                });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to fetch product details");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    const handleAddToCart = async () => {
        if (!product) return;

        try {
            await addToCart(product.id, 1);
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-light text-gray-600">Loading product details...</p>
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

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-light text-gray-600">Product not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="md:flex md:space-x-8">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <Image
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-3xl font-light text-gray-800 mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                            <p className="text-gray-800 font-light text-2xl mb-8">${product.price}</p>
                            <div className="space-y-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition duration-300"
                                >
                                    Add to Cart
                                </button>
                                <button className="w-full border border-gray-300 text-gray-600 py-3 px-6 hover:bg-gray-100 transition duration-300">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/pages/nav/products"
                            className="text-gray-600 hover:text-gray-800 transition duration-300"
                        >
                            ← Back to Collection
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

