"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import ProductList from "@/app/components/product-list";
import EditProductModal from "@/app/components/edit-product-modal";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Order = {
  id: number;
  customerName: string;
  total: number;
  status: string;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setIsAdmin(data.data?.is_admin === 1);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchOrders = async () => {
      // This is a placeholder. Replace with actual API call when available.
      const ordersData: Order[] = [
        { id: 1, customerName: "John Doe", total: 129.99, status: "Pending" },
        { id: 2, customerName: "Jane Smith", total: 179.98, status: "Shipped" },
      ];
      setOrders(ordersData);
    };

    fetchUserData();
    fetchProducts();
    fetchOrders();
  }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-light text-gray-800">You are not authorized to view this page.</p>
      </div>
    );
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const renderDashboard = () => (
    <div>
      <h2 className="text-2xl font-light mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-light mb-2">Total Products</h3>
          <p className="text-2xl">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-light mb-2">Total Orders</h3>
          <p className="text-2xl">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-light mb-2">Total Revenue</h3>
          <p className="text-2xl">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div>
      <h2 className="text-2xl font-light mb-4">Products</h2>
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      <div className="mt-4">
        <Link href="/pages/create-product" className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
          Create Product
        </Link>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h2 className="text-2xl font-light mb-4">Orders</h2>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customerName}</td>
              <td className="p-3">${order.total.toFixed(2)}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                <button className="text-green-500 hover:text-green-700">Update Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-light mb-8 text-gray-800">Admin Dashboard</h1>
        <div className="flex mb-8">
          <button
            className={`mr-4 ${activeTab === "dashboard" ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-600"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`mr-4 ${activeTab === "products" ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-600"}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`mr-4 ${activeTab === "orders" ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-600"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "orders" && renderOrders()}
      </div>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
}

