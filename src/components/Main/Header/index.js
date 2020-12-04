import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Image, Layout, Menu, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { GOOGLE_AUTH_URL } from "../../../constants";
import * as foodAction from "../../../redux/Action/categoryAction";
import "./index.css";

const Header = ({ listGroup, foodAct }) => {
  const a = localStorage.getItem("accessToken");
  const b = a ? true : false;

  console.log(b);

  let history = useHistory();
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("authenticated");
  });

  const fetchEmployee = useCallback(() => {
    const { getDataCategory } = foodAct;
    getDataCategory();
  }, [foodAct]);
  const onHandleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authenticated");
    
    setAuthenticated(false);
    history.push('/')
  };
  const handleLogin = () => {
    setAuthenticated(true);
  };
  console.log();
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const menu = (
    <Menu>
      {listGroup.map((category, index) => (
        <Menu.Item key={index}>
          <Link to={`/category/${category.id}`}>{category.categoryName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const menuUser = (
    <Menu>
      <Menu.Item>
        <Link to='/profile'>
          Tài khoản
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick ={onHandleLogout}>
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  );
  const { Header } = Layout;

  return (
    <Header className="header-main">
      <Row>
        <Col span={4}>
          <div className="logo-main">
            <Image
              src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-food-logo-designs-with-spoon-and-fork-png-image_4158238.jpg"
              width={50}
            />
          </div>
        </Col>
        <Col span={15}>
          <Menu theme="dark" mode="horizontal" className="menu-main">
            <Menu.Item key="1">
              {" "}
              <Link to="/" style={{ color: "#ffffff" }}>
                {" "}
                Trang chủ
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Dropdown overlay={menu}>
                <Link
                  to="/product"
                  style={{ background: "none", border: "none", color: "#fff" }}
                >
                  Menu <DownOutlined />
                </Link>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="3" style={{ color: "#ffffff" }}>
              Liên hệ
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={5}>
          <Row>
            <Col span={18} style={{ textAlign: "end", paddingRight: "30px" }}>
              <SearchOutlined
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                onClick={() => history.push(`/search/`)}
              />
            </Col>
            <Col span={6} >
              {b ? (
           
                  <Dropdown overlay={menuUser}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                     <UserOutlined /> Chào
                    </a>
                  </Dropdown>
                  
                
               
              ) : (
                <a onClick={handleLogin} href={GOOGLE_AUTH_URL} style={{color:'#ffffff'}}>
                  Login
                </a>
              )}
              {/* {a &&  <Button onClick={onHandleLogout}>Logout</Button>}
              {!a&&  <a href={GOOGLE_AUTH_URL} onClick={()=>console.log('a')}>Login</a>} */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    listGroup: state.groupData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAct: bindActionCreators(foodAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
