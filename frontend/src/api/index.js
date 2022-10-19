// export const foodRequest = {

import { Axios } from "../config";

// }

export const authRequest = {
  register: (formData) => {
    return Axios.post("/auth/register", formData);
  },
  login: (formData) => {
    return Axios.post("/auth/login", formData);
  },
};

export const postsRequest = {
  getAll: () => {
    return Axios.get("/post/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getPostsUser: () => {
    return Axios.get("/post/getPostsUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getOne: (id) => {
    return Axios.get(`post/getOne/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  addOne: (formData) => {
    return Axios.post("/post/addOne", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  deleteOne: (id) => {
    return Axios.delete(`/post/deleteOne/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateOne: (id, formData) => {
    return Axios.patch(`/post/updateOne/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
