import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postsRequest } from "../api";

export default function AddPostPage() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    postsRequest
      .addOne(form)
      .then((res) => {
        toast.success("Publication ajoutée");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <section id="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <div className="form-title">
          <h1>Nouvelle publication</h1>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Titre de la publication"
            required
            value={form.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Description de la publication"
            value={form.description}
            onChange={handleInputChange}
            rows="5"
            required
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
