import axios from "axios";
import { request } from '../utils/requests'

export const createOrder = async (body) => {
  return axios.post("https://localhost/WebApi/api/Order", body);
  //return request("POST", "Order", body)
};

export const getOrders = async (user_id) => {
  //return axios.post("http://localhost/WebApi/api/Order", {customer_id: user_id});
  return request("GET", "Order", {customer_id: user_id})
};

export const getOrderProducts = async (order_id) => {
  //return axios.post("http://localhost/WebApi/api/OrderProducts", {order_id: order_id});
  return request("GET", "OrderProduct", {order_id: order_id})
};

export const setOrderStatus = async (order_id, status) => {
  //return axios.post("http://localhost/WebApi/api/OrderProducts", {order_id: order_id});
  return axios.put(`https://localhost/WebApi/api/Order?order_id=${order_id}`, {status: status});
  //return request("PUT", `Order`, {order_id: order_id, status: status})
};