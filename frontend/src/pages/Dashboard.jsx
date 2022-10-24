import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { orderRequest } from "../api";
import Skeleton from "react-loading-skeleton";
import { OrderCardSkeleton } from "../components/OrderCardSkeleton";

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
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserOrders = async () => {
    console.log("gerUserOrders");
    orderRequest
      .getUserOrders()
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <section id="dashboard" className="page-container">
      <h1>Dashboard</h1>
      <h2>Mes commandes</h2>
      <div className="orders-container card-container">
        {isLoading ? (
          <OrderCardSkeleton cards={3} />
        ) : orders.length !== 0 ? (
          orders?.map((order) => (
            <div className="card" key={order._id}>
              <div className="card-header">
                <h3 className="card-title">Commande N° {order._id}</h3>
                <p className="card-subtitle">Du {order.createdAt}</p>
              </div>
              <div className="order-burger-container">
                {order.foods.map((item, index) => (
                  <div className="order-burger-card" key={item.food._id}>
                    <div className="order-burger-header">
                      <h3 className="order-burger-name">
                        {item.quantity + " " + item.food.name}
                      </h3>
                      <p className="order-burger-price">
                        Prix unitaire: {item.food.price} €
                      </p>
                    </div>
                    <div className="">
                      <p>{item.food.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-bottom">
                <p className="card-price">Prix total: {order.price} €</p>
              </div>
            </div>
          ))
        ) : (
          <p>Vous n'avez pas encore passé de commande</p>
        )}
      </div>
      <button className="btn btn-logout" onClick={() => logout()}>
        Déconnexion
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Confirmation</h2>
      </Modal>
    </section>
  );
}
