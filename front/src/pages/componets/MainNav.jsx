import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import userEcomStore from "../store/Ecom-store";
import { ChevronDown, CircleUserRound, LogIn } from "lucide-react";

const MainNav = () => {
  const carts = userEcomStore((state) => state.carts);
  const user = userEcomStore((state) => state.user);
  const logout = userEcomStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
 

  const proFileDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6 w-full">
            <Link to={"/"} className="text-2xl font-bold">
              Типография
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : " px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
              }
              to={"/cart"}
            >
              Корзина
              {carts.length > 0 && (
                <span
                  className="absolute top-0 bg-red-500
            rounded-full px-2
            "
                >
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={proFileDropDown}
                className="flex items-center gap-1 hover:bg-gray-200 px-2 py-3 rounded-md"
              >
                <CircleUserRound className="w-10 h-10"/>
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute top-16 mt-2 bg-white shadow-md z-50">
                  <Link
                    to={"/user/history"}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    История
                  </Link>

                  <Link
                    onClick={() => logout()}
                    to={"/login"}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Выйти
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : " px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
                }
                to={"/register"}
              >
                <div className="flex gap-1">
                  <CircleUserRound />
                  <p className="">Зарегистрироваться</p>
                </div>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : " px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-200"
                }
                to={"/login"}
              >
                <div className="flex gap-1">
                  <LogIn />
                  <p className="">Войти</p>
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
