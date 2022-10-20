import { useEffect, useState } from "react";
import { FoodCard } from "../components/FoodCard";
import { foodsRequest, cartRequest } from "../api";
import { useDispatch } from "react-redux";
import { init } from "../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    cartRequest
      .getOne()
      .then((res) => {
        dispatch(init(res.data.foods));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const addToCart = (id) => {
    cartRequest
      .addOne(id)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(init(res.data.cart.foods));
      })
      .catch((err) => console.log(err));
  };
  return (
    <section id="home">
      <ToastContainer />
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
