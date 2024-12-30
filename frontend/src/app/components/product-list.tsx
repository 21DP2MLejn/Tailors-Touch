import React from 'react';


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type ProductListProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} className="border-t">
            <td className="p-3">{product.name}</td>
            <td className="p-3">${Math.round(product.price * 100) / 100}</td>
            <td className="p-3">{product.description.substring(0, 50)}...</td>
            <td className="p-3">
              <button 
                onClick={() => onEdit(product)} 
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(product.id)} 
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;

