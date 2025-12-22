import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory, categoryById } from "../api/Category";
import { listProductOfCategory } from "../api/product";
import { login } from "../api/auth";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
      category: {id: 0, name: ""},
    });
  },

  actionAddtoCart: async (product, quantity) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, Count: quantity }];
    const uniqe = _.unionWith(updateCart, _.isEqual);
    // console.log('Click add in Zustand',carts)

    set({ carts: uniqe });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Click',productId,newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, Count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveCartProduct: (productId) => {
    // console.log("remove", productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.Id !== productId),
    }));
  },

  getItemDetails: () => {
    return get().carts.map((item) => ({
      name: item.title,
      totalPrice: item.Price * item.Count,
    }));
  },

  getTotaPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.Price * item.Count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await login(form.email, form.password);
    set({
      // user: res.data.payload,
      // token: res.data.token,
      user: res
    });
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res });
    } catch (error) {
      console.log(error);
    }
  },

  // getProduct: async (count) => {
  //   try {
  //     const res = await listProduct(count);
  //     set({ products: res.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  getProductOfCategory: async (id) => {
    try {
      const res = await listProductOfCategory(id);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },

  clearCart: () => {
    set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const userEcomStore = create(persist(ecomStore, usePersist));

export default userEcomStore;
