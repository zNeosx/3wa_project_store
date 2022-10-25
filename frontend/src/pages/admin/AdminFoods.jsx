import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminRequest } from "../../api";
import { initFoodState } from "../../features/adminSlice";

export default function AdminFoods() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.admin.foods);

  const deleteOneFood = (id) => {
    adminRequest
      .deleteOneFood(id)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(initFoodState(res.data.foods));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };
  return (
    <section className="admin-foods">
      <h2 className="a__page_title">Burgers récents</h2>
      <div className="a__foods_container">
        {foods?.map((food, index) => (
          <div className="a__food_card" key={index}>
            <div className="a__food_infos">
              <span className="a__food_name">{food.name}</span>
              <br />
              <span className="a__food_base">{food.base}</span>
            </div>
            <div className="a__btn_actions">
              <button className="btn_action_update">modifier</button>
              <button
                className="btn_action_delete"
                onClick={() => deleteOneFood(food._id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
