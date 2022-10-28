import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminRequest } from "../api";
import { initFoodState } from "../features/adminSlice";

export default function AddFoodPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const foods = useSelector((state) => state.admin.foods);

  const [form, setForm] = React.useState({
    name: "",
    base: "",
    ingredients: "",
    price: "",
    quantity: "",
    alias: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    adminRequest
      .addOneFood(form)
      .then((res) => {
        dispatch(initFoodState(res.data.foods));
        toast.success(res.data.message);
        navigate("/admin/foods");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <section className="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-title">
          <h1>Ajouter un burger</h1>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nom du burger</label>
          <input
            type="text"
            name="name"
            placeholder="Nom du burger"
            required
            value={form.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Base du burger</label>
          <input
            type="text"
            name="base"
            placeholder="Base du burger"
            required
            value={form.base}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Ingrédients</label>
          <textarea
            type="text"
            name="ingredients"
            placeholder="Ingrédients"
            required
            value={form.ingredients}
            onChange={handleInputChange}
            className="form-input"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="name">Prix du burger</label>
          <input
            type="text"
            name="price"
            placeholder="Prix du burger"
            required
            value={form.price}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Quantité du burger</label>
          <input
            type="text"
            name="quantity"
            placeholder="Quantité du burger"
            required
            value={form.quantity}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Alias du burger</label>
          <input
            type="text"
            name="alias"
            placeholder="Alias du burger"
            required
            value={form.alias}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="page-btn-action-container">
          <button className="btn valid-action-btn" type="submit">
            Ajouter
          </button>
          <button
            className="btn cancel-action-btn"
            onClick={() => navigate("/admin/foods")}
          >
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
