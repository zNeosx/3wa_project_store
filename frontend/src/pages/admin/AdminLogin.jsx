import React from "react";
import { useNavigate } from "react-router-dom";
import { adminRequest } from "../../api";
import FormInput from "../../components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    password: "",
  });

  let inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Mot de passe*",
      //   errorMessage:
      //     "Votre mot de passe doit être composé de 8 à 20 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
      label: "Mot de passe",
      //   pattern: "",
      required: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    adminRequest
      .login(form)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.token);
        navigate("/admin/users");
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
        toast.error(data.message, {
          margin: "60px",
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  return (
    <section className="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <div className="form-title">
          <h1>Connexion Administration</h1>
        </div>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={form[input.name]}
            onChange={handleInputChange}
          />
        ))}
        <button type="submit" className="btn form-btn-submit">
          Me connecter
        </button>
      </form>
    </section>
  );
}
