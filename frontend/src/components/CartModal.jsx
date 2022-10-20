import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { cartRequest } from "../api";
import { init } from "../features/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CartModal({ cartModalState }) {
  const cartState = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  return (
    <div className={`cart-modal ${cartModalState && "cart-open"}`}>
      <div className="cart-modal__container">
        {cartState?.map((burger) => (
          <div className="cart-modal__item" key={burger._id}>
            <div className="cart-modal__item_img">
              <img src={burger.food.url} alt={burger.food.name} />
            </div>
            <div className="cart-modal__item_content">
              <div className="cart-modal__item_header">
                <h3>{burger.food.name}</h3>
                <AiFillDelete
                  className="icons delete_cart_item_icon"
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
