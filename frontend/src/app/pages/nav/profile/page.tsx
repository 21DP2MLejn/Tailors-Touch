"use client";

import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteAccountModal from "@/app/components/delete-account-modal";

type UserData = {
    name: string;
    lastname: string;
    email: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
    phone: string;
    is_admin: boolean;
};

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedData, setEditedData] = useState<UserData | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchUserData();
    }, []);

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
            const jsonResponse = await response.json();
            setUserData(jsonResponse);
            setEditedData(jsonResponse);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    const handleEditProfile = () => {
        if (!userData?.is_admin) {
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedData(userData);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/profile", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedData),
            });
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
            setUserData(editedData);
            setIsEditing(false);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleDeleteProfile = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteProfile = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/profile", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete profile");
            }
            localStorage.removeItem("authToken");
            router.push("/pages/auth/login");
        } catch (err) {
            setError((err as Error).message);
        }
        setIsDeleteModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData(prev => prev ? { ...prev, [name]: value } : null);
    };

    if (loading) {
        return <p>Loading your profile...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!userData) {
        return <p>No user data available.</p>;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen py-10 px-4">
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
                                {Object.entries(userData).map(([key, value]) => (
                                    key !== "is_admin" && (
                                        <div key={key} className="p-4 border rounded-lg">
                                            <h3 className="font-medium text-gray-700 capitalize">{key.replace('_', ' ')}</h3>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    value={editedData?.[key as keyof UserData] ?? ''}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full px-2 py-1 border rounded"
                                                />
                                            ) : (
                                                <p>{value}</p>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                            {userData.is_admin && (
                                <div className="mt-6">
                                    <Link href="/pages/admin" passHref>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                                            Admin Panel
                                        </button>
                                    </Link>
                                </div>
                            )}
                            {!userData.is_admin && (
                                <div className="mt-6">
                                    <h1 className="text-xl font-semibold text-gray-800">Your Shipping details</h1>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="font-medium text-gray-700">Country</h3>
                                            <p>{userData.country}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="font-medium text-gray-700">City</h3>
                                            <p>{userData.city}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="font-medium text-gray-700">Address</h3>
                                            <p>{userData.address}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="font-medium text-gray-700">Postal Code</h3>
                                            <p>{userData.postalcode}</p>
                                        </div>
                                    </div>
                                    <br />
                                    <h1 className="text-xl font-semibold text-gray-800"> Your Orders</h1>
                                </div>
                            )}
                            <br />
                            {!userData.is_admin && (
                                <>
                                    {isEditing ? (
                                        <>
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-2"
                                                onClick={handleSaveEdit}
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-2"
                                                onClick={handleEditProfile}
                                            >
                                                Edit Profile
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                onClick={handleDeleteProfile}
                                            >
                                                Delete Profile
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteProfile}
            />
        </>
    );
}

