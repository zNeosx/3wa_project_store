import { useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import { postsRequest } from "../api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    postsRequest
      .getAll()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <section id="home" className="page-container">
      <h1>Homepage</h1>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
};

export default Home;
