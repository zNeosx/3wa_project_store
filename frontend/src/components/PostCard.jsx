import Avatar, { genConfig } from "react-nice-avatar";
import { decodeToken } from "react-jwt";
import { NavLink, Navigate } from "react-router-dom";

export const PostCard = ({ post }) => {
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const config = genConfig(JSON.parse(localStorage.getItem("avatar") || "{}"));
  const randomConfig = genConfig();

  return (
    <div
      className="post-card"
      onClick={() => <Navigate to={"post"} state={post} />}
    >
      <div className="post-header">
        {String(myDecodedToken.id) === String(post.userId._id) ? (
          <Avatar className="post-header-avatar" {...config} />
        ) : (
          <Avatar className="post-header-avatar" {...randomConfig} />
        )}
        <span className="post-header-username">{post.userId.username}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <span className="post-date">{post.createdAt}</span>
    </div>
  );
};
