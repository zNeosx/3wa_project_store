import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";

export const FoodCard = ({ food, addToCart }) => {
  const cartState = useSelector((state) => state.cart.cart);

  return (
    <div
      className="card home-card"
      onClick={() => <Navigate to={"food"} state={food} />}
    >
      <div className="card-header">
        <p className="home-card-subtitle">{food.base}</p>
        <h3 className="card-title">{food.name}</h3>
      </div>
      <div className="home-card-img">
        <img src={food.url} alt={`${food.name}`} />
        <div className="home-card-infos">
          <p>
            Ingrédients : <br />
            {food.ingredients}
          </p>
        </div>
      </div>
      <div className="home-card-bottom">
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
