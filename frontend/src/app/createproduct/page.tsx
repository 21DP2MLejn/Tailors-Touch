"use client";

import { useState } from 'react';

export default function CreateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer <your_token_here>', // Send the user’s token for authentication
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            // Reset form or show success message
            alert('Product created successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Create Product</button>
        </form>
    );
}
