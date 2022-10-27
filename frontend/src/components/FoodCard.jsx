import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";

export const FoodCard = ({ food, addToCart }) => {
  const cartState = useSelector((state) => state.cart.cart);

  return (
    <div
      className="home-burger-card"
      onClick={() => <Navigate to={"food"} state={food} />}
    >
      <div className="home-burger-card-header">
        <p className="home-burger-card-subtitle">{food.base}</p>
        <h3 className="home-burger-card-title">{food.name}</h3>
      </div>
      <div className="home-card-img">
        <img src={food.url} alt={`${food.name}`} />
        <div className="home-card-infos">
          <p>Ingrédients : {food.ingredients}</p>
        </div>
      </div>
      <div className="home-card-bottom">
        <span className="home-burger-card-price">
          {food.price} € {food.quantity === 0 && "Rupture de Stock"}
        </span>
        {cartState?.find((burger) => burger.food._id === food._id) ? (
          <BsCheckCircle className="valid_cart_icon" />
        ) : (
          <IoAddCircleOutline
            className="add-to-cart-icon"
            onClick={() => addToCart(food._id)}
            disabled={food.quantity === 0}
          />
        )}
      </div>
    </div>
  );
};
