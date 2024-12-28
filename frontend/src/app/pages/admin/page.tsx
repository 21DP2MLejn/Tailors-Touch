"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
                },
            });

            if (!response.ok) {
                console.error("Failed to fetch user data");
                return;
            }

            const data = await response.json();
            setUserData(data.data); 
            setIsAdmin(data.data?.is_admin === 1);
        };

        fetchUserData();
    }, []);

    if (isAdmin === false) {
        return <p>You are not authorized to view this page.</p>;
    }

    return (
        <div>
            <h1>Welcome, Admin</h1>
            <div>
                <h2>Products</h2>
                <ul>
                    {userData?.products?.map((product: any) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
                <button>
                    <Link href="/createproduct">Create Product</Link>
                </button>
            </div>
        </div>
    );
}
