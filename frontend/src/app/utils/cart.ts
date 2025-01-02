import axios from 'axios';

export const addToCart = async (productId: number, quantity: number) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/cart/add', {
            product_id: productId,
            quantity: quantity
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        // Check if the response contains the expected data
        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};


