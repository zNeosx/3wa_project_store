import { Navigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";

import { useSelector } from "react-redux";

export const FoodCard = ({ food, addToCart }) => {
  // const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart.cart);

  return (
    <div
      className="food-card"
      onClick={() => <Navigate to={"food"} state={food} />}
    >
      <span className="food-base">{food.base}</span>
      <h2>{food.name}</h2>
      <div className="food-header">
        <img src={food.url} alt={`${food.name}`} />
      </div>
      <div className="food-card-bottom">
        <span className="food-price">{food.price} €</span>
        {cartState?.find((burger) => burger.food._id === food._id) ? (
          <BsCheckCircle className="valid_cart_icon" />
        ) : (
          <IoAddCircleOutline
            className="add-cart-icon"
            onClick={() => addToCart(food._id)}
          />
        )}
      </div>
    </div>
  );
};
