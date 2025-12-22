import React, { useState } from "react";
import { toast } from "react-toastify";
import userEcomStore from "../store/Ecom-store";
import { useNavigate } from "react-router-dom";
import md5 from "js-md5";

const Login = () => {
  const navigate = useNavigate();

  const actionLogin = userEcomStore((state) => state.actionLogin);
  // const user = userEcomStore((state) => state.user);
  // console.log(user)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newForm = {...form, password: md5(form.password)}
      console.log(newForm);
      const res = await actionLogin(newForm);
      navigate('/');
      //toast.success("Добро пожаловать");
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Войти
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Почта
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
              placeholder="Введите вашу почту"
              onChange={handleOnchange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
              placeholder="Введите ваш пароль"
              onChange={handleOnchange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Войти
          </button>

          <div className="text-sm text-center text-gray-600 mt-4">
            <a
              href="/register"
              className="text-blue-500 hover:underline hover:text-blue-700 font-medium"
            >
              Зарегистрироваться
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
