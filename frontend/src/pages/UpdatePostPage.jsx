import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest } from "../api";
import { initFoodState } from "../features/adminSlice";

export default function UpdatePostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    name: location.state.name,
    base: location.state.base,
    ingredients: location.state.ingredients,
    price: location.state.price,
    quantity: location.state.quantity,
    alias: location.state.url.split("/").slice(-1)[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    adminRequest
      .updateOneFood(location.state._id, form)
      .then((res) => {
        dispatch(initFoodState(res.data.foods));
        toast.success(res.data.message);
        navigate("/admin/foods");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  return (
    <section className="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <div className="form-title">
          <h1>Modifier</h1>
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
            Modifier
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
