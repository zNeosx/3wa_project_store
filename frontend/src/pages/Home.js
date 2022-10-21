import { useEffect, useState } from "react";
import { FoodCard } from "../components/FoodCard";
import { foodsRequest, cartRequest } from "../api";
import { useDispatch } from "react-redux";
import { init } from "../features/cartSlice";
import { toast } from "react-toastify";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();

  const getAllFoods = async () => {
    foodsRequest
      .getAll()
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllFoods();
  }, []);

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
      <div className="foods-container page-container">
        {foods?.map((food) => (
          <FoodCard key={food._id} food={food} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

export default Home;
