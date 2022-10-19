import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { foodsRequest } from "../api";
import { FoodCard } from "../components/FoodCard";

export default function Food() {
  //   const { id } = useParams();
  const [food, setFood] = useState({});

  //   const getPost = () => {
  //     postsRequest
  //       .getOne(id)
  //       .then((res) => {
  //         setPost(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   useEffect(() => {
  //     getPost();
  //   }, []);
  console.log(food);
  return (
    <section className="page-container">
      <FoodCard food={food} />
    </section>
  );
}
