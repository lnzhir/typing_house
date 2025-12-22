import React, { useEffect } from "react";
import ProductCard from "./componets/card/ProductCard";
import userEcomStore from "./store/Ecom-store";
import CartCard from "./componets/card/CartCard";

const Shop = () => {
  const getCategory = userEcomStore((state) => state.getCategory);
  const categories = userEcomStore((state) => state.categories);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 p-8">

      <div>
        <p className="text-2xl font-bold mb-6 text-gray-800">
          Полиграфические услуги
        </p>
        <div className="grid grid-cols-4 gap-12">
          {categories.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
          {/*<ProductCard item={{title: "Визитки", min_price: 899}}/>
          <ProductCard item={{title: "Визитки", min_price: 899}}/>
          <ProductCard item={{title: "Визитки", min_price: 899}}/>
          <ProductCard item={{title: "Визитки", min_price: 899}}/>
          <ProductCard item={{title: "Визитки", min_price: 899}}/>*/}
        </div>
      </div>
  </div>
  
  );
};

export default Shop;
