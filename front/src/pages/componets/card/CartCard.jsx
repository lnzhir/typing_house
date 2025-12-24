import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";
import { Link } from 'react-router-dom'
import { numberFormat } from "../../utils/number";
import { toast } from "react-toastify";

const CartCard = ({ item }) => {

  const actionUpdateQuantity = userEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveCartProduct = userEcomStore(
    (state) => state.actionRemoveCartProduct
  );
  
  return (
    <div
      key={item.Id}
      className="w-full bg-white shadow-lg rounded-lg p-4 mb-6"
    >
      <div className="flex flex-wrap items-center gap-6">
        {item.Category.Image ? (
          <img
            className="w-36 h-36 rounded-md object-cover"
            src={`${import.meta.env.VITE_BACK_HOST}/api/Asset?path=${item.Category.Image}`}
            alt="image"
          />
        ) : (
          <div className="w-36 h-36 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {item.Category.Name} ({item.Size}/{item.Color})
          </h2>
          <div className="mt-3">
            <span className="text-gray-700 font-medium">Цена:</span>{" "}
            <span className="text-blue-600 font-bold text-lg text-nowrap">
              {numberFormat(item.Price)}₽
            </span>
          </div>
          <div className="mt-3">
            <span className="text-gray-700 font-medium">Количество:</span>{" "}
            <span className="text-blue-600 font-bold text-lg text-nowrap">
            {numberFormat(item.Count)}
            </span>
          </div>
        </div>

        <div className="truncate">
          <h3 className="text-lg font-semibold text-gray-800">
            Итого:
          </h3>
          <p className="text-blue-600 font-bold text-lg">
            {numberFormat(item.Price * item.Count)}₽
          </p>
        </div>

        <button
          onClick={() => actionRemoveCartProduct(item.Id)}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={30} />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
