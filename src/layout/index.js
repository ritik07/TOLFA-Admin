import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
//icon
import AddmissionIcon from "../static/images/icons/pet-care.png";
import MenuIcon from "../static/images/icons/menu.png";
import { menuItem } from "../constants/menu";
import axios from "axios";
import { BASE_URL } from "../constants/server";
import Loader from "../components/loader/loader";

import { useDispatch } from "react-redux";
import { setUserProfile } from "../redux/actions/userProfile";

const { Header, Sider, Content } = Layout;

const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user_id"));
    setUserId(userId);
    console.log("already here", userId);
  }, []);

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      let userResponse = await axios.get(BASE_URL + "/user/" + userId);
      console.log("userResponse", userResponse);
      dispatch(setUserProfile(userResponse.data.data));
      setUserData(userResponse.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const onClickMenu = (e) => {
    navigate(e.key);
    console.log("click ", e);
  };

  return !loading ? (
    [userData].length ? (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          {!collapsed ? (
            <div className="cs-dis-flex cs-hrz-center cs-vt-center">
              <div className="tolfa-menu-logo">TOLFA</div>
            </div>
          ) : null}
          <Menu
            theme="dark"
            mode="inline"
            onClick={onClickMenu}
            defaultSelectedKeys={["/" + window.location.pathname.split("/")[1]]}
            items={menuItem}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: "#408E91" }}>
            <div className="cs-lm-10">
              <div className="cs-dis-flex cs-vt-center cs-jc-sb">
                <div className="cs-dis-flex cs-vt-center">
                  <img
                    src={MenuIcon}
                    className="cs-menu-icon cs-pointer"
                    onClick={() => setCollapsed(!collapsed)}
                  />
                </div>
                <div className="cs-dis-flex cs-vt-center">
                  <div className="cs-rm-10">
                    <Avatar
                      onClick={handleProfile}
                      size={50}
                      icon={<UserOutlined />}
                    />
                  </div>
                </div>
              </div>
              {/* {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )} */}
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              // background: "#000",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    ) : (
      <div>
        <h2>Something went wrong, please try again.</h2>
      </div>
    )
  ) : (
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default LayoutWrapper;
