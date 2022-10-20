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

export const chartRequest = {
  getOne: () => {
    return Axios.get("/chart/getOne", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
};
