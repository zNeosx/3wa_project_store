import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postsRequest } from "../api";

export default function UpdatePostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
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
      .updateOne(id, form)
      .then((res) => {
        toast.success("Publication modifiée");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    postsRequest
      .getOne(id)
      .then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <section id="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <div className="form-title">
          <h1>Modifier</h1>
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
          Modifier
        </button>
      </form>
    </section>
  );
}
