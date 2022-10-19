// export const foodRequest = {

import { Axios } from "../config";

// }
const token = sessionStorage.getItem("token");

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
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getOne: (id) => {
    return Axios.get(`foods/getOne/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addOne: (formData) => {
    return Axios.foods("/foods/addOne", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteOne: (id) => {
    return Axios.delete(`/foods/deleteOne/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateOne: (id, formData) => {
    return Axios.patch(`/foods/updateOne/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
