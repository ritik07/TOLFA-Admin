import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
//icon
import MenuIcon from "../static/images/icons/menu.png";
import { menuItem } from "../constants/menu";
import Loader from "../components/loader/loader";

const { Header, Sider, Content } = Layout;

const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const onClickMenu = (e) => {
    navigate(e.key);
    console.log("click ", e);
  };

  return !loading ? (
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
    <div className="cs-dis-flex cs-hrz-center cs-vt-center cs-h-100vh">
      <Loader />
    </div>
  );
};

export default LayoutWrapper;
