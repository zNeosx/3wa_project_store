import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { init } from "../features/cartSlice";
import { cartRequest } from "../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.cart);
  const [cartPrice, setCartPrice] = useState(0);

  const deleteFoodFromCartModal = (id) => {
    cartRequest
      .deleteOne(id)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => console.log(err));
  };

  const incrementQty = (foodId) => {
    cartRequest
      .incrementOne(foodId)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => console.log(err));
  };
  const decrementQty = (foodId) => {
    cartRequest
      .decrementOne(foodId)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let price = 0;
    cartState?.map((burger) => (price += burger.food.price * burger.quantity));
    setCartPrice(price);
  }, [cartState]);

  return (
    <section className="cart">
      <div className="page-container cart-container">
        <div className="cart__item__container">
          <h1>Mon panier</h1>
          {cartState?.map((burger) => (
            <div className="cart__item" key={burger._id}>
              <div className="cart__item_img">
                <img src={burger.food.url} alt={burger.food.name} />
              </div>
              <div className="cart__item_content">
                <div className="cart__item_header">
                  <h3>{burger.food.name}</h3>
                  <AiFillDelete
                    className="icons delete_cart_item_icon"
                    onClick={() => deleteFoodFromCartModal(burger.food._id)}
                  />
                </div>
                <p>{burger.food.price} €</p>
                <div className="quantity__management">
                  <button
                    className="quantity__btn"
                    onClick={() => decrementQty(burger.food._id)}
                    disabled={burger.quantity === 1}
                  >
                    -
                  </button>
                  <span className="quantity__number">{burger.quantity}</span>
                  <button
                    className="quantity__btn"
                    onClick={() => incrementQty(burger.food._id)}
                    disabled={burger.quantity === 5}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart_price__container">
          <h2>Total</h2>
          <p>{cartPrice} €</p>
        </div>
        <button className="btn payment-btn">Passer ma commande</button>
      </div>
    </section>
  );
}
