import axios from "axios";
import { request } from '../utils/requests'

// export const currentUser = async (token) =>
//   await axios.post(
//     "https://ecommerce-sell-of-backend-nodejs.vercel.app/api/current-user",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );



// export const currenAdmin = async (token) => {
//   return await axios.post('https://ecommerce-sell-of-backend-nodejs.vercel.app/api/current-admin', {}, {
//     headers : {
//      Authorization: `Bearer ${token}`
//     }
//   })
// };

export const registrate = async (body) => {
  return axios.post("https://localhost:44386/api/Customer", body);
  //return request("POST", "Customer", body)
};

export const login = async (email, password) => {
  return request("GET", "Login", {email: email, password: password})
};