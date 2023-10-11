import { Outlet, Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./layout.css";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SearchBar from "./components/mobile/searchBar/searchBar";

const { Header, Content, Footer } = Layout;

const LayoutWrapper = () => {
  const navigate = useNavigate();

  const handleUserProfile = () => {
    // if login ok else
    let login = false;
    if (login) {
    } else {
      navigate("/login-signup");
    }
  };

  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs

  if (isMobile) {
    // Render mobile header
    return (
      <>
        <Layout className="cs-layout">
          {/* Mobile Header */}
          <Header className="fix-header cs-mobile-header zi-5 cs-mobile-header-bottom">
            {/* Mobile logo */}
            <div className="logo" />
            <div>
              <div className="cs-fw-800 cs-clr-000 cs-fs-16 cs-dis-flex cs-hrz-center cs-lh-40 cs-font">
                Doggiesthan
              </div>

              <div className="cs-lp-10 cs-rp-10 cs-tp-5 cs-bp-5">
                <SearchBar />
              </div>
            </div>
          </Header>
          <Content className="cs-container">
            <Outlet />
          </Content>
        </Layout>
      </>
    );
  }

  // Render desktop header
  return (
    <>
      <Layout className="cs-layout">
        {/* Desktop Header */}
        <Header className="fix-header zi-5">
          <div className="logo" />
          <Row>
            <Col span={2}></Col>
            <Col span={2} onClick={() => navigate("/")}>
              <div className="cs-fw-800 cs-clr-000 cs-fs-16 cs-dis-flex cs-hrz-center">
                Doggiesthan
              </div>
            </Col>

            <Col span={6}></Col>

            {/* Menu */}
            <Col span={7}>
              <Row gutter={[80, 10]}>
                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-header-menu"
                >
                  Home
                </Col>
                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-header-menu"
                >
                  Category
                </Col>
                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-header-menu"
                >
                  About
                </Col>
                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-header-menu"
                >
                  Contact
                </Col>
              </Row>
            </Col>

            <Col span={7}>
              <Row gutter={[10, 10]}>
                <Col span={7}></Col>

                {/* cart search and account */}
                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-vt-center cs-header-menu-icon"
                >
                  <div>
                    <SearchOutlined />
                  </div>
                </Col>

                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-vt-center cs-header-menu-icon"
                >
                  <div>
                    <ShoppingCartOutlined />
                  </div>
                </Col>
                <Col
                  span={2}
                  className="cs-dis-flex cs-hrz-center cs-vt-center cs-header-menu-icon"
                  onClick={handleUserProfile}
                >
                  <div>
                    <UserOutlined />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content className="cs-container">
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default LayoutWrapper;
