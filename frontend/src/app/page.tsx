"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const authToken = localStorage.getItem("authToken");
            const response = await axios.get("http://127.0.0.1:8000/api/products", {
                headers: authToken
                    ? { Authorization: `Bearer ${authToken}` }
                    : undefined,
            });
            console.log("API Response:", response.data);
            setProducts(response.data.data || []);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center">
                    <Image
                        src="/placeholder.svg?height=1080&width=1920"
                        alt="Fashion collection showcase"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
                    <div className="relative z-10 text-center text-accent">
                        <h1 className="text-4xl md:text-6xl font-light mb-4">Welcome to Tailor&#39;s Touch</h1>
                        <p className="text-xl md:text-2xl mb-8">Discover Your Perfect Style</p>
                        <Link
                            href="/pages/nav/products"
                            className="bg-white text-text py-2 px-6 rounded-md hover:bg-gray-100 transition duration-300"
                        >
                            Shop Now
                        </Link>
                    </div>
                </section>

                {/* New Arrivals */}
                <section className="py-16 px-4 bg-white relative">
                    <h2 className="text-3xl font-light text-center mb-12">New Arrivals</h2>
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : products.length > 0 ? (
                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={30}
                            navigation
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 4 },
                            }}
                            className="mySwiper"
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="group relative">
                                        <div className="relative aspect-w-1 aspect-h-1">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white text-xl font-light">{product.name}</p>
                                            <p className="text-white text-lg">${product.price}</p>
                                            <Link
                                                href="/pages/nav/products"
                                                className="bg-white text-text py-2 px-4 mt-4 rounded-md hover:bg-gray-100 transition duration-300"
                                            >
                                                View All Products
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="text-center">No products available.</p>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
