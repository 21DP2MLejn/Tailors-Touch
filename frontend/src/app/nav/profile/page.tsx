"use client";

import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";

type UserData = {
    name: string;
    lastname: string;
    email: string;
};

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const jsonResponse = (await response.json()) as { name: string; email: string; lastname: string };
                setUserData(jsonResponse);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-100 py-10 px-4">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    {loading && <p>Loading your profile...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && userData && (
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome, {userData.name} {userData.lastname}!
                            </h1>
                            <p className="text-gray-600 mt-2">Email: {userData.email}</p>

                            <h2 className="text-xl font-semibold text-gray-800 mt-6">Your Profile Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium text-gray-700">First Name</h3>
                                    <p>{userData.name}</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium text-gray-700">Last Name</h3>
                                    <p>{userData.lastname}</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium text-gray-700">Email</h3>
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
