import { Provider } from "react-redux";
import { store } from "./redux/index";
import "./static/style/main.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Router from "./routes/routes";

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
        <Router />
      </Provider>
    </div>
  );
}

export default App;
