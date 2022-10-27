import { FoodCard } from "../components/FoodCard";
import { cartRequest } from "../api";
import { useDispatch } from "react-redux";
import { init } from "../features/cartSlice";
import { toast } from "react-toastify";
import { FoodCardSkeleton } from "../components/FoodCartSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = ({ isLoading, foods }) => {
  const dispatch = useDispatch();

  const addToCart = (id) => {
    cartRequest
      .addOne(id)
      .then((res) => {
        dispatch(init(res.data.cart.foods));
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <section id="home">
      <h2 className="menu-title page-container">Nos Burgers</h2>
      <div className="home-burgers-container page-container">
        {isLoading ? (
          <FoodCardSkeleton cards={8} />
        ) : (
          foods?.map((food) => (
            <FoodCard key={food._id} food={food} addToCart={addToCart} />
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
