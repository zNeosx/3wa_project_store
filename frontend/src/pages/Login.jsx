import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { genConfig } from "react-nice-avatar";
import { toast, ToastContainer } from "react-toastify";
import { authRequest } from "../api";
import FormInput from "../components/FormInput";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  // init from state
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  // Init from inputs
  const inputs = [
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
      label: "Mot de passe",
      required: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const generateRandomAvatar = () => {
    const config = genConfig();
    sessionStorage.setItem("avatar", JSON.stringify(config));
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
        <button type="submit" className="btn form-btn-submit">
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
