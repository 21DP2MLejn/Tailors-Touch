"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ProductDetails() {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-blue-500 font-bold text-xl">${product.price}</p>
        </div>
    );
}
