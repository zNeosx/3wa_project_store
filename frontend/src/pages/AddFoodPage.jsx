import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { foodsRequest } from "../api";

export default function AddFoodPage() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: "",
    category: "",
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

    foodsRequest
      .addOne(form)
      .then(() => {
        toast.success("Produit ajouté avec succès");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <section id="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-title">
          <h1>Nouvelle publication</h1>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            required
            value={form.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn btn-submit">
          Créer
        </button>
      </form>
    </section>
  );
}
