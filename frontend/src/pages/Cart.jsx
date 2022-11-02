import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { init } from "../features/cartSlice";
import { cartRequest } from "../api";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // INITIALISATION DES VARIABLES D'ÉTAT
  const [cartPrice, setCartPrice] = useState(0);
  const cartState = useSelector((state) => state.cart.cart);

  // () => SUPPRIMER UN PRODUIT DU PANIER
  const deleteFoodFromCart = (id) => {
    cartRequest
      .deleteFoodFromCart(id)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

  // () => INCREMENTER LA QUANTITÉ D'UN PRODUIT DU PANIER
  const incrementQty = (foodId) => {
    cartRequest
      .incrementOne(foodId)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
      })
      .catch((err) => console.log(err));
  };

  // () => DECREMENTER LA QUANTITÉ D'UN PRODUIT DU PANIER
  const decrementQty = (foodId) => {
    cartRequest
      .decrementOne(foodId)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
      })
      .catch((err) => console.log(err));
  };

  // () => CALCULE LE PRIX TOTAL DU PANIER
  const calculateCartPrice = () => {
    let price = 0;
    cartState?.map((burger) => (price += burger.food.price * burger.quantity));
    setCartPrice(price);
  };

  useEffect(() => {
    calculateCartPrice();
  }, [cartState]);

  return (
    <section className="cart">
      <div className="page-container cart-container">
        <div className="cart-item-container">
          <h1>Mon panier</h1>
          {cartState?.length > 0 ? (
            cartState?.map((burger) => (
              <div className="cart-item" key={burger._id}>
                <div className="cart-item-img">
                  <img src={burger.food.url} alt={burger.food.name} />
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-header">
                    <h3>{burger.food.name}</h3>
                    <button>
                      <AiFillDelete
                        className="icons delete-cart-item-icon"
                        onClick={() => deleteFoodFromCart(burger.food._id)}
                      />
                    </button>
                  </div>
                  <p>{burger.food.price} €</p>
                  <div className="quantity-management">
                    <button
                      className="quantity-btn"
                      onClick={() => decrementQty(burger.food._id)}
                      disabled={burger.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity-number">{burger.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => incrementQty(burger.food._id)}
                      disabled={burger.quantity === 5}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>Ton panier est vide</h3>
          )}
        </div>
        <div className="cart-price-container">
          <h3>Total</h3>
          <span>{cartPrice} €</span>
        </div>
        <div className="page-btn-action-container">
          <button
            className="btn valid-action-btn"
            onClick={() => navigate("/order")}
            disabled={cartState?.length === 0}
          >
            Valider mon panier
          </button>
          <button
            className="btn cancel-action-btn"
            onClick={() => navigate("/")}
          >
            Revenir à l'accueil
          </button>
        </div>
      </div>
    </section>
  );
}
