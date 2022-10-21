// export const foodRequest = {

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
    return Axios.get("/chart/getOne", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  addOne: (id) => {
    return Axios.post(
      "/chart/addOne",
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
    return Axios.delete(`/chart/deleteFoodFromCart/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  incrementOne: (id) => {
    return Axios.patch(
      `/chart/incrementOne`,
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
      `/chart/decrementOne`,
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
};
