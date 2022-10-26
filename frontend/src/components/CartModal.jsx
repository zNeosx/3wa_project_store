import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { cartRequest } from "../api";
import { init } from "../features/cartSlice";

export default function CartModal({ cartModalState }) {
  const cartState = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteFoodFromCartModal = (id) => {
    cartRequest
      .deleteFoodFromCart(id)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`cart-modal ${cartModalState && "cart-open"}`}>
      <div className="cart-modal-container">
        {cartState?.map((burger) => (
          <div className="cart-modal-item" key={burger._id}>
            <div className="cart-modal-item-img">
              <img src={burger.food.url} alt={burger.food.name} />
            </div>
            <div className="cart-modal-item-content">
              <div className="cart-modal-item-header">
                <h3>{burger.food.name}</h3>
                <AiFillDelete
                  className="icons delete-cart-item-icon"
                  onClick={() => deleteFoodFromCartModal(burger.food._id)}
                />
              </div>
              <p>{burger.food.price} €</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn payment-btn" onClick={() => navigate("/cart")}>
        Accéder au panier
      </button>
    </div>
  );
}
