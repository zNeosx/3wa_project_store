import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { authRequest } from "../api";
import FormInput from "../components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  // init form state
  const [form, setForm] = React.useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  // Init from inputs
  const inputs = [
    {
      id: 1,
      name: "lastname",
      type: "text",
      placeholder: "Nom*",
      errorMessage:
        "Ton nom doit être compris entre 3 et 16 carctères et ne doit pas contenir de caractères spéciaux ou de chiffres",
      label: "Lastname",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "firstname",
      type: "text",
      placeholder: "Prénom*",
      errorMessage:
        "Ton prénom doit être compris entre 3 et 16 carctères et ne doit pas contenir de caractères spéciaux ou de chiffres",
      label: "firstname",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Pseudo*",
      errorMessage:
        "Ton pseudo doit faire entre 3 et 16 caractères et peut contenir des lettres, des chiffres, des tirets et des underscores.",
      label: "Username",
      pattern: "^[a-zA-Z0-9_-]{3,16}$",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Adresse e-mail*",
      errorMessage: "Ton adresse e-mail n'est pas valide.",
      label: "Email",
      required: true,
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Mot de passe*",
      errorMessage:
        "Ton mot de passe doit être composé de 8 à 20 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
      label: "Mot de passe",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    authRequest
      .register(form)
      .then(() => {
        toast.success("Inscription réussie !", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch(({ response: { data } }) => {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <section className="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <div className="form-title">
          <h1>Je crée mon compte</h1>
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
          M'inscrire
        </button>
        <Link to="/login" className="link">
          J'ai déjà un compte
        </Link>
      </form>
    </section>
  );
};

export default Register;
