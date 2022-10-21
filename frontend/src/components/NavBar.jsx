import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";
import { BsFillBagCheckFill } from "react-icons/bs";

const NavBar = ({ setCartModalState, cartModalState }) => {
  const cartState = useSelector((state) => state.cart.cart);
  const [cartCount, setCartCount] = useState(cartState.length);
  const config = genConfig(
    JSON.parse(sessionStorage.getItem("avatar") || "{}")
  );

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
              onClick={() => setCartModalState(!cartModalState)}
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
};

export default NavBar;