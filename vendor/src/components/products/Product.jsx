import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Product = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
      <div className="text-sm text-gray-500 mb-4">{product.description}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl divide-x divide-gray-300">
        <div className="p-3">
          <div className="flex items-center mb-4">
            <span className="font-semibold">Category: </span>
            <span>{product.category.join(", ")}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-semibold mr-2">Price: </span>
            <span>₹{product.price}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-semibold mr-2">Calories: </span>
            <span>{product.calories}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-semibold mr-2">Available for ordering: </span>
            <span>{product.available ? "Yes" : "No"}</span>
          </div>
          {product.images.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold mr-2">Images: </span>
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`product-img-${index}`}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          {product.mainImage && (
            <div className="mb-4">
              <span className="font-semibold">Main Image: </span>
              <img
                src={URL.createObjectURL(product.mainImage)}
                alt="main-product-img"
                className="h-16 w-16 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <div className="p-3">
          {product.items.length > 0 ? (
            <div className="mb-4 rounded-xl overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Serving Size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Calories
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.servingSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.calories}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center h-full items-center">
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No items added yet
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 px-3 my-3">
        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        >
          <PencilIcon className="h-5 w-5" /> Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          <TrashIcon className="h-5 w-5" /> Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
