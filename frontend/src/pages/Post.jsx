import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postsRequest } from "../api";
import { PostCard } from "../components/PostCard";

export default function Post() {
  //   const { id } = useParams();
  const [post, setPost] = useState({});

  //   const getPost = () => {
  //     postsRequest
  //       .getOne(id)
  //       .then((res) => {
  //         setPost(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   useEffect(() => {
  //     getPost();
  //   }, []);
  console.log(post);
  return (
    <section className="page-container">
      <PostCard post={post} />
    </section>
  );
}
