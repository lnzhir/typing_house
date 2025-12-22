import React, { useState } from "react";
import { AlignLeft, Minus, Plus, Trash2 } from "lucide-react";
import userEcomStore from "../../store/Ecom-store";
import { Link, useNavigate } from "react-router-dom";
// import { createUserCart } from "../../api/user";
import { createOrder } from "../../api/order";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import CartCard from './CartCard'

const ListCart = () => {
  const cart = userEcomStore((state) => state.carts);
  const clearCart = userEcomStore((state) => state.clearCart);

  const actionUpdateQuantity = userEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveCartProduct = userEcomStore(
    (state) => state.actionRemoveCartProduct
  );
  const getItemDetails = userEcomStore((state) => state.getItemDetails);
  const totadetail = getItemDetails();
  const getTotaPrice = userEcomStore((state) => state.getTotaPrice);
  const user = userEcomStore((state) => state.user);
  //const token = userEcomStore((state) => state.token);
  //const navigate = useNavigate();

  // const [isDisabled, setIsDisabled] = useState(false);

  // const setTimedisable = () => {
  //   setIsDisabled(true);
  //   setTimeout(() => {
  //     setIsDisabled(false);
  //   }, 5000);
  // };

  const handleSaveCart = async () => {
    // await createUserCart(token, { cart })
    //   .then((res) => {
    //     console.log(res);
    //     toast.success("เพิ่มลงตะกร้าสำเสร็จ");
    //     navigate("/checkout");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.warning(error.response.data.message);
    //   });
    createOrder({user: user, products: cart});
    clearCart();
  };

  return (
    <div className="bg-gray-100 rounded-md p-4">
      <div className="flex gap-4 mb-4">
        <AlignLeft size={36} />
        <p className="text-2xl font-bold">В корзине {cart.length} </p>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 ">
          <div className="border border-gray-800 "></div>

          {cart.map((item, index) => (
            <CartCard item={item}/>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <p className="text-3xl font-bold text-gray-800">Оплата</p>
          {/*{totadetail.map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-300 shadow-md rounded-md mb-4 p-4 flex justify-between items-center"
            >
              <div className="text-gray-900 text-[14px] font-semibold ">
                {item.name}
              </div>
              <div className="text-blue-500 text-xl font-bold text-right">
                {numberFormat(item.totalPrice)}₽
              </div>
            </div>
          ))}*/}

          <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
            <span>Итого</span>
            <span className="text-2xl text-green-600">
              {numberFormat(getTotaPrice())}₽
            </span>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  onClick={handleSaveCart}
                  className={` w-full rounded-md text-white py-3 shadow-md hover:bg-red-600 transition duration-300
                    ${
                      cart.length < 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }
                    `}
                >
                  {cart.length < 1 ? "Корзина пуста" : "Оплатить"}
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-500 w-full rounded-md text-white py-3 shadow-md hover:bg-blue-700 transition duration-300">
                  Войти
                </button>
              </Link>
            )}

            <Link to={"/"}>
              <button className="bg-gray-500 w-full rounded-md text-white py-3 shadow-md hover:bg-gray-600 transition duration-300">
                К продуктам
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
