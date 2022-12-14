import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setInitialState } from "../features/cartSlice";
import { orderRequest } from "../api";

export default function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // INITIALISATION DES VARIABLES D'ÉTAT
  const cartState = useSelector((state) => state.cart.cart);
  const [cartPrice, setCartPrice] = useState(0);

  // () => CALCULE LE PRIX TOTAL DU PANIER
  const calculateCartPrice = () => {
    let price = 0;
    cartState?.map((burger) => (price += burger.food.price * burger.quantity));
    setCartPrice(price);
  };

  // () => VALIDER LA COMMANDE
  const placeOrder = (price) => {
    orderRequest
      .addOne(price)
      .then((res) => {
        dispatch(setInitialState());
        setCartPrice(0);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  // () => LANCE LA FONCTION calculateCartPrice()
  useEffect(() => {
    calculateCartPrice();
  }, []);

  return (
    <section id="order-page">
      <div className="page-container cart-container">
        <div className="cart-item-container">
          <h1>Ma commande</h1>
          {cartState?.length > 0 ? (
            cartState?.map((burger) => (
              <div className="cart-item" key={burger._id}>
                <div className="cart-item-img">
                  <img src={burger.food.url} alt={burger.food.name} />
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-header">
                    <h3>{burger.food.name}</h3>
                  </div>
                  <p>Prix unitaire : {burger.food.price} €</p>
                  <span className="quantity-number">
                    Quantité : {burger.quantity}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <h3>Aucun commande à passer, ton panier est vide.</h3>
          )}
        </div>
        <div className="cart-price-container">
          <h3>Prix total :</h3>
          <p>{cartPrice} €</p>
        </div>
        <div className="page-btn-action-container">
          <button
            className="btn valid-action-btn"
            onClick={() => placeOrder(cartPrice)}
            disabled={cartState?.length === 0}
          >
            Valider ma commande
          </button>
          <button
            className="btn cancel-action-btn"
            onClick={() => navigate("/cart")}
          >
            Revenir au panier
          </button>
        </div>
      </div>
    </section>
  );
}
