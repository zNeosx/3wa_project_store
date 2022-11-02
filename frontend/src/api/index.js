import { Axios } from "../config";

export const authRequest = {
  register: (formData) => {
    return Axios.post("/auth/register", formData);
  },
  login: (formData) => {
    return Axios.post("/auth/login", formData);
  },
};

export const foodsRequest = {
  getAll: () => {
    return Axios.get("/foods/getAll", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  getOne: (id) => {
    return Axios.get(`foods/getOne/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  addOne: (formData) => {
    return Axios.foods("/foods/addOne", formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  deleteOne: (id) => {
    return Axios.delete(`/foods/deleteOne/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  updateOne: (id, formData) => {
    return Axios.patch(`/foods/updateOne/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
};

export const cartRequest = {
  getOne: () => {
    return Axios.get("/cart/getOne", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  addOne: (id) => {
    return Axios.post(
      "/cart/addOne",
      {
        foodId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  deleteFoodFromCart: (id) => {
    return Axios.delete(`/cart/deleteFoodFromCart/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  incrementOne: (id) => {
    return Axios.patch(
      `/cart/incrementOne`,
      {
        foodId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  decrementOne: (id) => {
    return Axios.patch(
      `/cart/decrementOne`,
      {
        foodId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
};

export const orderRequest = {
  addOne: (price) => {
    return Axios.post(
      "/orders/addOne",
      { price },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  getUserOrders: () => {
    return Axios.get("/orders/getUserOrders", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
};

export const adminRequest = {
  login: (formData) => {
    return Axios.post("/admin/login", formData);
  },
  getUsers: () => {
    return Axios.get("/admin/users/getAll", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  deleteOneUser: (id) => {
    return Axios.delete(`/admin/users/deleteOne/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  getFoods: () => {
    return Axios.get("/admin/foods/getAll", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  addOneFood: (formData) => {
    return Axios.post("/admin/foods/addOne", formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  deleteOneFood: (id) => {
    return Axios.delete(`/admin/foods/deleteOne/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  updateOneFood: (id, form) => {
    return Axios.patch(`/admin/foods/updateOne/${id}`, form, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
};
