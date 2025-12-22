import axios from "axios";
import { request } from '../utils/requests'


export const listCategory = async () => {
  //return axios.get("https://localhost:44386/api/Category");
  return request("GET", "Category", {})
};

export const categoryById = async (id) => {
  console.log(id)
  //return axios.get("http://localhost/WebApi/api/Category/" + id);
  return request("GET", `Category`, {id: id})
};