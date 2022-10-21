import "./App.css";
import "./assets/scss/register.scss";
import "./assets/scss/navbar.scss";
import "./assets/scss/home.scss";
import "./assets/scss/dashboard.scss";
import "./assets/scss/cartModal.scss";
import "./assets/scss/cart.scss";
import "./assets/scss/skeleton.scss";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import ClientLayout from "./components/ClientLayout";
import Dashboard from "./pages/Dashboard";
import AddFoodPage from "./pages/AddFoodPage";
import Food from "./pages/Food";
import Cart from "./pages/Cart";
import { SkeletonTheme } from "react-loading-skeleton";
import Order from "./pages/Order";

function App() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const getAllFoods = async () => {
  //   foodsRequest
  //     .getAll()
  //     .then((res) => {
  //       setFoods(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const getCartUser = async () => {
  //   cartRequest
  //     .getOne()
  //     .then((res) => {
  //       dispatch(init(res.data.foods));
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     getAllFoods();
  //     getCartUser();
  //   }
  // }, [sessionStorage.getItem("token")]);
  return (
    <div className="App">
      <SkeletonTheme baseColor="#c2cfd6" highlightColor="#f0f3f5">
        <Routes>
          <Route
            path="/"
            element={
              <ClientLayout setFoods={setFoods} setIsLoading={setIsLoading} />
            }
          >
            <Route element={<PrivateRoutes />}>
              <Route
                index
                element={<Home foods={foods} isLoading={isLoading} />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add_food" element={<AddFoodPage />} />
              {/* <Route path="update_post/:id" element={<UpdatePostPage />} /> */}
              <Route path="food" element={<Food />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<Order />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
