import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { authRequest } from "../api";
import FormInput from "../components/FormInput";
import { genConfig } from "react-nice-avatar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  let inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Adresse e-mail*",
      errorMessage: "Veuillez saisir une adresse email valide",
      label: "Email",
      required: true,
    },
    {
      id: 2,
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

  const generateRandomAvatar = () => {
    const config = genConfig();
    localStorage.setItem("avatar", JSON.stringify(config));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    authRequest
      .login(form)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.token);
        generateRandomAvatar();
        navigate("/");
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
    <section id="auth-page">
      <form className="form" onSubmit={handleFormSubmit}>
        <ToastContainer />
        <div className="form-title">
          <h1>Je me connecte</h1>
        </div>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={form[input.name]}
            onChange={handleInputChange}
          />
        ))}
        <button type="submit" className="btn btn-submit">
          Me connecter
        </button>
        <Link to="/register" className="link">
          Créer mon compte
        </Link>
      </form>
    </section>
  );
};

export default Login;
