import Avatar, { genConfig } from "react-nice-avatar";
import { decodeToken } from "react-jwt";
import { NavLink, Navigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

export const FoodCard = ({ food }) => {
  // const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const config = genConfig(
    JSON.parse(sessionStorage.getItem("avatar") || "{}")
  );
  const randomConfig = genConfig();

  return (
    <div
      className="food-card"
      onClick={() => <Navigate to={"food"} state={food} />}
    >
      <span className="food-base">{food.base}</span>
      <h2>{food.name}</h2>
      <div className="food-header">
        <img src={food.url} alt={`Image ${food.name}`} />
      </div>
      <div className="food-card-bottom">
        <span className="food-price">{food.price} €</span>
        <IoAddCircleOutline className="add-chart-icon" />
      </div>
    </div>
  );
};
