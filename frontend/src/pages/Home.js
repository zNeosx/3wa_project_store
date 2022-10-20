import { useEffect, useState } from "react";
import { FoodCard } from "../components/FoodCard";
import { foodsRequest, chartRequest } from "../api";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const chartState = useSelector((state) => state.chart.chart);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(init(chartState));
  }, []);

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
    chartRequest
      .getOne()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
