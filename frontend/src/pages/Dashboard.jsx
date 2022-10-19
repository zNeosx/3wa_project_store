import { useEffect, useState } from "react";
import { foodsRequest } from "../api";
import Avatar, { genConfig } from "react-nice-avatar";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Dashboard() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const [foodToDelete, setFoodToDelete] = useState(null);

  const config = genConfig(JSON.parse(localStorage.getItem("avatar") || "{}"));

  // const getPostsUser = () => {
  //   foodsRequest
  //     .getPostsUser()
  //     .then((res) => {
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const deleteFood = (id) => {
    foodsRequest
      .deleteOne(id)
      .then((res) => {
        toast.success("Produit supprimé avec succès");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // const updatePost = (id) => {
  //   window.location.href = `update_post/${id}`;
  // };

  // useEffect(() => {
  //   getPostsUser();
  // }, []);

  return (
    <section id="dashboard" className="page-container">
      {/* <ToastContainer /> */}
      <h1>Dashboard</h1>
      <ToastContainer />
      <h2>Mes commandes</h2>
      {foods?.map((food) => (
        <div className="food-card" key={food._id}>
          <div className="food-header">
            <div className="food-header-user">
              <Avatar className="food-header-avatar" {...config} />
              <span className="food-header-username">
                {food.userId.username}
              </span>
            </div>
            <div className="food-header-btn">
              <button
                className="btn btn-delete"
                onClick={() => {
                  setFoodToDelete(food._id);
                  setIsOpen(true);
                }}
              >
                <TiDeleteOutline className="food-icons" />
                Supprimer
              </button>
              {/* <button
                className="btn btn-edit"
                onClick={() => updatefood(food._id)}
              >
                <AiOutlineEdit className="food-icons" />
                Modifier
              </button> */}
            </div>
          </div>
          <h2>{food.name}</h2>
          <span className="food-price">{food.price}</span>
          <span className="food-quantity">
            {food.quantity > 0 ? food.quantity : "Rupture de stock"}
          </span>
          <span className="food-date">{food.createdAt}</span>
        </div>
      ))}
      <button className="btn btn-logout" onClick={() => logout()}>
        Déconnexion
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Tu veux vraiment supprimer ce produit ?</h2>
        <div className="modal-btn">
          <button className="btn" onClick={() => deleteFood(foodToDelete)}>
            Oui
          </button>
          <button className="btn" onClick={() => setIsOpen(false)}>
            Non
          </button>
        </div>
      </Modal>
    </section>
  );
}
