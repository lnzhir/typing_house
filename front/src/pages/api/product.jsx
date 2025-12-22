import axios from "axios";
import { request } from '../utils/requests'



export const listProductOfCategory = async (id) => {
  //return axios.get("http://localhost/WebApi/api/Product", {id: id});
  return request("GET", "Product", {id: id})
};

export const getProduct = async (id) => {
  //return axios.get("http://localhost/WebApi/api/Product", {id: id});
  return request("GET", `Product/${id}`, {})
};
