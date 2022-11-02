import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";
import { BsFillBagCheckFill } from "react-icons/bs";

export default function NavBar({ setCartModalState, cartModalState }) {
  // INITIALISATION DES VARIABLES D'ÉTAT
  const cartState = useSelector((state) => state.cart.cart);
  const [cartCount, setCartCount] = useState(cartState.length);

  // RÉCUPERE LA CONFIG DE L'AVATAR
  const config = genConfig(
    JSON.parse(sessionStorage.getItem("avatar") || "{}")
  );

  // () => INCREMENTER LA QUANTITE DE PRODUIT DANS LE PANIER
  useEffect(() => {
    setCartCount(cartState.length);
  }, [cartState]);

  return (
    <nav id="nav">
      <div className="nav-container page-container">
        <div className="logo">
          <NavLink to="/">Burger Land</NavLink>
        </div>
        <ul>
          <li className="cart-link">
            <BsFillBagCheckFill
              className={
                cartState.length === 0 ? "cart-icon" : "cart-icon-active"
              }
              onClick={() => setCartModalState(true)}
            />
            <span className="cart-count">{cartCount}</span>
          </li>
          <li className="avatar-block">
            <NavLink to="/dashboard" className={"avatar-link"}>
              <Avatar className="avatar" {...config} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
