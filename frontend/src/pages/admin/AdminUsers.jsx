import React from "react";
import { useSelector } from "react-redux";

export default function AdminUsers() {
  const users = useSelector((state) => state.admin.users);

  return (
    <section className="admin-users">
      <h2 className="a__page_title">Utilisateurs récents</h2>
      <div className="a__users_container">
        {users?.map((user, index) => (
          <div className="a__user_card" key={index}>
            <div className="a__user_infos">
              <span className="a__user_lastname">{user.lastname}</span>
              <span className="a__user_firstname">{user.firstname}</span>
              <br />
              <span className="a__user_email">{user.email}</span>
            </div>
            <div className="a__user_actions">
              <button className="user_action">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
