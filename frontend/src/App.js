import "./App.css";
import "./assets/scss/navbar.scss";
import "./assets/scss/home.scss";
import "./assets/scss/dashboard.scss";
import "./assets/scss/cartModal.scss";
import "./assets/scss/cart.scss";
import "./assets/scss/skeleton.scss";
import "./assets/scss/admin.scss";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import ClientLayout from "./components/ClientLayout";
import Dashboard from "./pages/Dashboard";
import AddFoodPage from "./pages/admin/AddFoodPage";
import Cart from "./pages/Cart";
import { SkeletonTheme } from "react-loading-skeleton";
import Order from "./pages/Order";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminRoutes from "./components/AdminRoutes";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFoods from "./pages/admin/AdminFoods";
import UpdatePostPage from "./pages/admin/UpdatePostPage";

function App() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
      <SkeletonTheme baseColor="#c2cfd6" highlightColor="#f0f3f5">
        <Routes>
          {/* ==== PRIVATE ROUTES ==== */}
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <ClientLayout setFoods={setFoods} setIsLoading={setIsLoading} />
              }
            >
              <Route
                index
                element={<Home foods={foods} isLoading={isLoading} />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add_food" element={<AddFoodPage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<Order />} />
            </Route>
          </Route>

          {/* ==== PUBLIC ROUTES ==== */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ==== ADMIN ROUTES ==== */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/" element={<AdminLayout />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="foods" element={<AdminFoods />} />
              <Route path="foods/add" element={<AddFoodPage />} />
              <Route path="foods/update" element={<UpdatePostPage />} />
            </Route>
          </Route>
        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
