import React, { useEffect, useState } from "react";
import ProductCard from "./componets/card/ProductCard";
import userEcomStore from "./store/Ecom-store";
import CartCard from "./componets/card/CartCard";

const Shop = () => {
  const getCategory = userEcomStore((state) => state.getCategory);
  const categories = userEcomStore((state) => state.categories);
  // const [colsCount, setColsCount] = useState(1);
  // const [gap, setGap] = useState(10);

  useEffect(() => {
    getCategory();

    // const handleResize = () => {
    //   window.innerWidth
    // };

    // window.addEventListener('resize', handleResize);

    // handleResize();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-8">

      <p className="text-2xl font-bold mb-6 text-gray-800">
        Полиграфические услуги
      </p>
      <div className="grid grid-cols-4 gap-12">
      {/*<div className="flex flex-wrap">*/}
        {categories.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
  </div>
  
  );
};

export default Shop;
