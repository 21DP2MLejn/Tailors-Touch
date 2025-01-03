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
            setError("Failed to fetch products. Please try again later.");
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
                        src="/Images/banner2.jpg"
                        alt="Fashion collection showcase"
                        fill
                        style={{ objectFit: "cover", opacity:"80%" }}
                        priority

                    />
                    <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
                    <div className="relative z-10 text-center text-accent">
                        <h1 className="text-h1 text-text md:text-6xl font-light mb-4">Welcome to Tailor&#39;s Touch</h1>
                        <p className="text-h2 text-text md:text-2xl mb-8">Discover Your Perfect Style</p>
                        <Link href="/pages/nav/products">
                            <p className="bg-primary text-text py-2 px-6 hover:bg-gray-100 transition duration-300">
                                Shop Now
                            </p>
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
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white text-xl font-light">{product.name}</p>
                                            <p className="text-white text-lg">${product.price}</p>
                                            <Link href="/pages/nav/products">
                                                <p className="bg-white text-text py-2 px-4 mt-4 rounded-md hover:bg-gray-100 transition duration-300">
                                                    View All Products
                                                </p>
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
                {/* About Us */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-light mb-6">About Tailor's Touch</h2>
                        <p className="text-primary mb-8">
                            At Tailor's Touch, we believe that fashion is a form of self-expression. Our curated collection
                            of high-quality, stylish pieces is designed to help you showcase your unique personality.
                            From casual wear to elegant evening attire, we have something for every occasion.
                        </p>
                        <Link href="/about" className="text-text border border-gray-900 py-2 px-6 rounded-md hover:bg-accent transition duration-300">
                            Learn More
                        </Link>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-16 px-4 bg-accent">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-3xl font-light mb-6">Stay Updated</h2>
                        <p className="text-primary mb-8">
                            Subscribe to our newsletter for the latest updates, exclusive offers, and style tips.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-2 rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-primary text-accent py-2 px-6 rounded-md hover:bg-secondary transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
