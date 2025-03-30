import React, { useState } from "react";
import Product from "./Product";
import ProductForm from "./ProductForm";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const initialProducts = [
  {
    id: 1,
    name: "Breakfast Thali",
    description: "A wholesome breakfast platter to start your day.",
    category: ["Breakfast"],
    price: 150,
    calories: 850,
    available: true,
    images: [],
    mainImage: null,
    items: [
      { name: "Idli", servingSize: "2 pieces", calories: 200 },
      { name: "Sambhar", servingSize: "1 bowl", calories: 150 },
    ],
  },
  {
    id: 2,
    name: "Lunch Thali",
    description: "A hearty lunch platter for a fulfilling meal.",
    category: ["Lunch"],
    price: 250,
    calories: 1050,
    available: true,
    images: [],
    mainImage: null,
    items: [
      { name: "Rice", servingSize: "1 plate", calories: 300 },
      { name: "Dal", servingSize: "1 bowl", calories: 200 },
    ],
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: prev.length + 1 }]);
    setIsFormOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsFormOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => {
            setCurrentProduct(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onEdit={handleEditClick}
          onDelete={handleDeleteProduct}
        />
      ))}
      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={currentProduct ? handleEditProduct : handleAddProduct}
        initialData={currentProduct}
        userLogin="Ravindrajangir007"
        currentDateTime="2025-03-29 10:10:59"
      />
    </div>
  );
};

export default ProductList;
