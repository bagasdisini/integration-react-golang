import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./pages/NavBar";
import Page from "./pages/LandingPage";
import Detail from "./pages/DetailRest";
import Profile from "./pages/Profile";
import ProfilePartner from "./pages/ProfilePartner";
import Cart from "./pages/CartOrder";
import EditProfile from "./pages/EditProfile";
import EditProfilePartner from "./pages/EditProfilePartner";
import AddProduct from "./pages/AddProduct";
import Transaction from "./pages/IncomeTransaction";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import React from "react";
import { CartProvider, useCart } from "react-use-cart";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const {
    addItem,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // if (state.isLogin === true && state.user.role === "user") {
    //   navigate("/");
    // } else if (state.isLogin == true && state.user.role === "admin") {
    //   navigate("/");
    // }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      console.log(state);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <CartProvider>
      <Navigation totalItems={totalItems} />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route
          path="/detail-restaurant"
          element={<Detail addItem={addItem} />}
        />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/profile-partner" element={<ProfilePartner />} />
        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              updateItemQuantity={updateItemQuantity}
              removeItem={removeItem}
              cartTotal={cartTotal}
              totalItems={totalItems}
            />
          }
        />
        <Route path="/edit-my-profile" element={<EditProfile />} />
        <Route path="/edit-profile-partner" element={<EditProfilePartner />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
