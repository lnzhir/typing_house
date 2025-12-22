import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import { dateFormat } from "../../utils/datefrom";
import { numberFormat } from "../../utils/number";
import { getOrders, getOrderProducts } from "../../api/order";
import { getProduct } from "../../api/product";
import { categoryById } from "../../api/Category";

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);

  const user = userEcomStore((state) => state.user);


  const setOrdersAsync = async () => {
    const orders = (await getOrders(user.Id));
    for (const order of orders) {
      const products = await getOrderProducts(order.Id);
      order.products = products;
      order.orderStatus = 0;
      order.totalPrice = 0;
      for (const product of order.products) {
        //product.Product = (await getProduct(product.ProductId));
        
        //product.product.title = (await categoryById(product.product.CategoryId)).Name;
        order.totalPrice += product.Price * product.Count;
      }
    }
    
    setOrders(orders);
  }

  useEffect(() => {
    setOrdersAsync()
  }, []);

  const getStatusColor = (status) => {
    const colors = ["bg-gray-200", "bg-blue-200", "bg-green-200", "bg-red-200"];
    return colors[status];
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">История заказов</h1>

      {/* หัว */}
      <div className="space-y-4">
        {/* Card */}

        {orders?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                 
                  <p className="text-sm text-gray-500">Дата заказа</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {dateFormat(item.updatedAt)}
                  </p>
                </div>
                {/*<div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    item.orderStatus
                  )}`}
                >
                  {item.orderStatus}
                </div>*/}
              </div>

              {/* Table */}
              <div className="mb-4">
                <table className="w-full border border-gray-300 text-left text-sm">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="py-2 px-4">Продукт</th>
                      <th className="py-2 px-4">Размер</th>
                      <th className="py-2 px-4">Цвет</th>
                      <th className="py-2 px-4">Цена</th>
                      <th className="py-2 px-4">Количество</th>
                      <th className="py-2 px-4">Итого</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-t`}
                      >
                        <td className="py-2 px-4">{product.Product.Category.Name}</td>
                        <td className="py-2 px-4">{product.Product.Size}</td>
                        <td className="py-2 px-4">{product.Product.Color}</td>
                        <td className="py-2 px-4">{numberFormat (product.Price)}</td>
                        <td className="py-2 px-4">{product.Count}</td>
                        <td className="py-2 px-4">
                          {numberFormat (product.Count * product.Price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="flex justify-end mt-4">
                <div>
                  <p className="text-sm text-gray-500">Итого</p>
                  <p className="text-xl font-semibold text-gray-700">
                    {numberFormat (item.totalPrice)} ₽
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
