import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { adminRequest } from "../../api";
import { initUserState } from "../../features/adminSlice";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  const deleteOneUser = (id) => {
    adminRequest
      .deleteOneUser(id)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(initUserState(res.data.users));
        // window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };
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
            <div className="a__btn_actions">
              <button
                className="btn_action_delete"
                onClick={() => deleteOneUser(user._id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
