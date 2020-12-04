import { Col, Divider, Menu, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Profile = (props) => {
  return (
    <div>
      <Row type="flex" className="user-info-container">
        <Col xs={24} md={22} xl={20} style={{ margin: "auto" }}>
          <Row className="rowProfile1">
            <Col xs={0} md={6} style={{ padding: "0 8px" }}>
              <Row>
                <Menu
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                >
                  <Menu.Item key="1" className="menuItemProfile">
                  <Link to='/profile'>
                  Thông tin cá nhân
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="2" className="menuItemProfile">
                      <Link to='/profile/order'>
                      Quản lý đơn hàng
                      </Link>
                  
                  </Menu.Item>
                </Menu>
              </Row>
            </Col>
            <Col xs={24} md={18} style={{ padding: "0 8px" }}>
              <div className="cardProfileUser">
                <Row style={{ padding: "22px" }}>
                  <span className="spanTitleProfile">Thông tin cá nhân</span>
                </Row>
                <Divider />
                <Row className="user-profile">
                  <Col xs={24} md={24}>
                    <Row>
                      <span style={{ fontSize: "16px", fontWeight: 500 }}>
                        Họ tên
                      </span>
                    </Row>
                    <Row>Nguyễn Đức Thiện</Row>
                    <Row>
                      <span style={{ fontSize: "16px", fontWeight: 500 }}>
                        Họ tên
                      </span>
                    </Row>
                    <Row>Nguyễn Đức Thiện</Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
