import { useEffect, useState } from "react";
import { FoodCard } from "../components/FoodCard";
import { foodsRequest } from "../api";

const Home = () => {
  const [foods, setFoods] = useState([]);

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

  return (
    <section id="home">
      <h2 className="menu-title page-container">Nos Burgers</h2>
      <div className="foods-container page-container">
        {foods?.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
};

export default Home;
