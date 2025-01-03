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
    phone: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
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
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-h3 font-light ">Loading your profile...</p>
            </div>
        )
    }

    if (error) {
        return(
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 bg-slate-50">Error: {error}</p>;
            </div>
        )
    }

    if (!userData) {
        return(
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 bg-slate-50">No user data available</p>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen py-10 px-4">
                <div className="max-w-4xl mx-auto border border-secondary shadow-lg rounded-lg p-6">
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && userData && (
                        <div>
                            <h1 className="text-h1 font-light">
                                Welcome, {userData.name} {userData.lastname}!
                            </h1>
                            <p className=" mt-2">Email: {userData.email}</p>
                            <h2 className="text-h2 font-light mt-6">Your Profile Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {Object.entries(userData).map(([key, value]) => (
                                    key !== "is_admin" && (
                                        <div key={key} className="p-4 border border-secondary rounded-lg">
                                            <h3 className="font-medium  capitalize">{key.replace('_', ' ')}</h3>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    value={editedData?.[key as keyof UserData] ?? ''}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-full px-2 py-1 border rounded"
                                                />
                                            ) : (
                                                <p>{value === null || value === undefined ? "Not provided" : value}</p>
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
                            <br/>
                            <h1 className="text-h1 font-light"> Your Orders</h1>
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

