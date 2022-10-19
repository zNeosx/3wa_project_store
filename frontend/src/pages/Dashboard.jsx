import { useEffect, useState } from "react";
import { postsRequest } from "../api";
import Avatar, { genConfig } from "react-nice-avatar";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Dashboard() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);

  const config = genConfig(JSON.parse(localStorage.getItem("avatar") || "{}"));

  const getPostsUser = () => {
    postsRequest
      .getPostsUser()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    window.location.href = "/";
  };

  const deletePost = (id) => {
    postsRequest
      .deleteOne(id)
      .then((res) => {
        toast.success("Publication supprimée");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const updatePost = (id) => {
    window.location.href = `update_post/${id}`;
  };

  useEffect(() => {
    getPostsUser();
  }, []);

  return (
    <section id="dashboard" className="page-container">
      {/* <ToastContainer /> */}
      <h1>Dashboard</h1>
      <ToastContainer />
      <h2>Mes publications</h2>
      {posts?.map((post) => (
        <div className="post-card" key={post._id}>
          <div className="post-header">
            <div className="post-header-user">
              <Avatar className="post-header-avatar" {...config} />
              <span className="post-header-username">
                {post.userId.username}
              </span>
            </div>
            <div className="post-header-btn">
              <button
                className="btn btn-delete"
                onClick={() => {
                  setPostToDelete(post._id);
                  setIsOpen(true);
                }}
              >
                <TiDeleteOutline className="post-icons" />
                Supprimer
              </button>
              <button
                className="btn btn-edit"
                onClick={() => updatePost(post._id)}
              >
                <AiOutlineEdit className="post-icons" />
                Modifier
              </button>
            </div>
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <span className="post-date">{post.createdAt}</span>
        </div>
      ))}
      <button className="btn btn-logout" onClick={() => logout()}>
        Déconnexion
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Tu veux vraiment supprimer cette publication ?</h2>
        <div className="modal-btn">
          <button className="btn" onClick={() => deletePost(postToDelete)}>
            Oui
          </button>
          <button className="btn" onClick={() => setIsOpen(false)}>
            Non
          </button>
        </div>
      </Modal>
    </section>
  );
}
