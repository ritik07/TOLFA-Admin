import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import Dashboard from "./pages/dashboard";
import LayoutWrapper from "./layout";
import "./static/style/main.css";
import Admission from "./pages/admission";
import RescueType from "./pages/master/rescue/rescueType";
import Login from "./pages/login";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./pages/profile";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("logged_in")) {
      setTimeout(() => {
        navigate("/login");
      }, 1);
    }
    if (localStorage.getItem("logged_in") && window.location.pathname === "/") {
      setTimeout(() => {
        navigate("/home");
      }, 1);
    }
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Routes>
          {localStorage.getItem("logged_in") ? (
            <Route element={<LayoutWrapper />}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/rescue-type" element={<RescueType />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
