import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
//icon
import AddmissionIcon from "../static/images/icons/pet-care.png";
import MenuIcon from "../static/images/icons/menu.png";
import { menuItem } from "../constants/menu";

const { Header, Sider, Content } = Layout;

const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClickMenu = (e) => {
    navigate(e.key);
    console.log("click ", e);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  return (
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
            <div className="cs-dis-flex ce-vt-center cs-tm-15">
              <img
                src={MenuIcon}
                className="cs-menu-icon cs-pointer"
                onClick={() => setCollapsed(!collapsed)}
              />
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
  );
};

export default LayoutWrapper;
