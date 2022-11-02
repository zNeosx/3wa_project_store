import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderRequest } from "../api";
import { OrderCardSkeleton } from "../components/OrderCardSkeleton";
import Moment from "moment";

export default function Dashboard() {
  const navigate = useNavigate();
  // INITIALISATION DES VARIABLES D'ÉTAT
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // () => RÉCUPERE LES COMMANDES DE L'UTILISATEUR
  const getUserOrders = async () => {
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

  // () => DÉCONNEXION
  const logout = () => {
    sessionStorage.clear();
    toast.success("Vous êtes déconnecté", {
      position: "top-center",
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <section id="dashboard" className="page-container">
      <button className="btn btn-logout" onClick={() => logout()}>
        Me déconnecter
      </button>
      <h2>Mes commandes</h2>
      <div className="orders-container card-container">
        {isLoading ? (
          <OrderCardSkeleton cards={3} />
        ) : orders.length !== 0 ? (
          orders?.map((order, index) => (
            <div className="card" key={order._id}>
              <div className="card-header">
                <h3 className="card-title">Commande N° {index + order._id}</h3>
                <p className="card-subtitle">
                  Du {Moment(order.createdAt).format("DD/MM/YYYY")}
                </p>
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
    </section>
  );
}
