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
import UserRole from "./pages/master/user/userRole";
import User from "./pages/master/user/user";
import SpeciesType from "./pages/master/rescue/speciesType";
import Status from "./pages/master/animal/status";
import Breed from "./pages/master/animal/breed";
import State from "./pages/master/location/state";
import City from "./pages/master/location/city";
import CityArea from "./pages/master/location/cityArea";
import Area from "./pages/master/location/area";
import BlockNumber from "./pages/master/location/blockNumber";

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

              <Route path="/profile" element={<Profile />} />

              <Route path="/user-role" element={<UserRole />} />
              <Route path="/user" element={<User />} />

              <Route path="/rescue-type" element={<RescueType />} />
              <Route path="/species-type" element={<SpeciesType />} />

              <Route path="/status" element={<Status />} />
              <Route path="/breed" element={<Breed />} />

              <Route path="/state" element={<State />} />
              <Route path="/city" element={<City />} />
              <Route path="/city-area" element={<CityArea />} />

              <Route path="/tolfa-area" element={<Area />} />
              <Route path="/tolfa-block-number" element={<BlockNumber />} />
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
