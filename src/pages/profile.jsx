import React from "react";
import { Card, Row, Col, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { handleLogout } from "../global/function.global";

const Profile = () => {
  const userData = useSelector((state) => state.userProfile.userProfile);
  console.log("userData", userData);
  return (
    <div>
      <Card>
        <Row gutter={[20, 20]}>
          <Col xl={4}>
            <div className="cs-w-100">
              <Avatar size={150} icon={<UserOutlined />} />
            </div>
          </Col>

          <Col xl={20}>
            <Row>
              <Col xl={2}>
                <div className="cs-label cs-fw-800 cs-fs-22">Name:</div>
              </Col>
              <Col xl={3}>
                <div className="cs-fw-800 cs-fs-22">{userData.name}</div>
              </Col>
            </Row>

            <Row>
              <Col xl={3}>
                <div className="cs-label cs-fw-800 cs-fs-22">Phone No:</div>
              </Col>
              <Col xl={10}>
                <div className="cs-fw-800 cs-fs-22">{userData.phone_no}</div>
              </Col>
            </Row>

            <Row>
              <Col xl={2}>
                <div className="cs-label cs-fw-800 cs-fs-22">Role:</div>
              </Col>
              <Col xl={10}>
                <div className="cs-fw-800 cs-fs-22">
                  {userData?.user_role?.map((x, i) => {
                    return x.split("_").join(" ") + ", ";
                  })}
                </div>
              </Col>
            </Row>

            <Row gutter={[20, 20]} className="cs-tm-20">
              <Col xl={24}>
                <Button type="primary" onClick={handleLogout}>Logout</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
