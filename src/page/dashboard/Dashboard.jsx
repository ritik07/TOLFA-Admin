import React, { useState } from "react";
import Home from "../../component/home";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Loader from "../../component/loader/loader";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCompleteUserSession();
  }, []);

  const getCompleteUserSession = async () => {
    try {
      let user_id = JSON.parse(localStorage.getItem("user_id"));
      let response = await axios.get(
        BASE_URL + `user/usersession/getcompletesession/${user_id}`
      );
      localStorage.setItem(
        "user_session",
        JSON.stringify(response.data.data.session_data.session_id)
      );
      console.log("response", response);

      setIsLoading(false);
    } catch (error) {
      if (error.response.data.status === 500) {
        setIsLoading(false);
      }
      console.log("error", error);
    }
  };

  return (
    <div>
      {!isLoading ? (
        <Home />
      ) : (
        <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
