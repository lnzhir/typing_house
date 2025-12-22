import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
import { registrate } from '../api/auth'
import md5 from "js-md5";

const registerSchema = z
  .object({
    FirstName: z.string(),
    Email: z.string().email({ message: "Плохая почта" }),
    Password: z.string().min(8, { message: "Длина пароля меньше 8" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: "Пароль не совпадает",
    path: ["confirmPassword"],
  });

const Register = () => {
 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [passwordScore, setPasswordScore] = useState(0);

  const validatePassword = () => {
    let password = watch().Password;
    return zxcvbn(password ? password : "").score;
  };
  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().Password]);

  console.log(passwordScore);

  const onSubmit = async (data) => {
    console.log(data);
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 3) {
    //   toast.warning("Password ไม่ปลอดภัย กรุณาตั้งรหัสผ่านใหม่");
    //   return;
    // }
    console.log("ok");
    try {

      const res = registrate({...data, Password: md5(data.Password)})
      console.log(res);
      //toast.success(res.data);
      navigate('/login')
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Зарегистрироваться
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Имя
            </label>
            <input
              {...register("FirstName")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Почта
            </label>
            <input
              {...register("Email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Введите вашу почту"
            />
            {errors.Email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Пароль
            </label>
            <input
              {...register("Password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="password"
              placeholder="Введите ваш пароль"
            />
            {errors.Password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.Password.message}
              </p>
            )}

            {/*{watch().Password?.length > 0 && (
              <div className="flex items-center mt-3">
                {Array.from(Array(5).keys()).map((item, index) => (
                  <span className="w-1/5 px-1" key={index}>
                    <div
                      className={`h-2 rounded-md ${
                        passwordScore <= 2
                          ? "bg-red-400"
                          : passwordScore < 4
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                  </span>
                ))}
              </div>
            )}*/}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Повторите пароль
            </label>
            <input
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="password"
              placeholder="Введите ваш пароль"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
