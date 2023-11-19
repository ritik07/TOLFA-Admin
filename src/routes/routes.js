import React from "react";
import LayoutWrapper from "../layout";
import Dashboard from "../pages/dashboard";
import Profile from "../pages/profile";
import User from "../pages/master/user/user";
import RescueType from "../pages/master/rescue/rescueType";
import SpeciesType from "../pages/master/rescue/speciesType";
import { Routes, Route } from "react-router-dom";
import Status from "../pages/master/animal/status";
import Breed from "../pages/master/animal/breed";
import State from "../pages/master/location/state";
import City from "../pages/master/location/city";
import CityArea from "../pages/master/location/cityArea";
import Area from "../pages/master/location/area";
import BlockNumber from "../pages/master/location/blockNumber";
import Login from "../pages/login";
import AddAdmission from "../pages/admission/AddAdmission/AddAdmission";
import AdmissionList from "../pages/admission/AdmissionList/AdmissionList";
import UserRole from "../pages/master/user/userRole";

const Router = () => {
  return (
    <Routes>
      {localStorage.getItem("logged_in") ? (
        <Route element={<LayoutWrapper />}>
          <Route path="/home" element={<Dashboard />} />

          <Route path="/add-admission" element={<AddAdmission />} />

          <Route path="/admission-list" element={<AdmissionList />} />

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
  );
};

export default Router;
