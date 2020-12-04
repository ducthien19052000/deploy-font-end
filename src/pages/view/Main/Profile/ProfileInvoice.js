import { Button, Col, Divider, Menu, Row, Table } from "antd";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import * as userAction from "../../../../redux/Action/userAction";

const ProfileInvoice = ({ litsInvoice, invoiceAct,user,userAct }) => {
  const fetchEmployee = useCallback(() => {
    const { getData } = userAct;
   
    getData();
  }, [userAct]);
  useEffect(() => {
    fetchEmployee();
    
  }, [fetchEmployee]);
  useEffect(() => {
    const { getDataUser } = invoiceAct;
    getDataUser(user.email);
  }, [user]);
  console.log(litsInvoice);
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "",
      render: (text, record) => {
      
          return <span >{record.invoiceInfo.fullName}</span>;
        
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      render: (text, record) => {

        return    <span >{record.invoiceInfo.deliveryAddress}</span>

      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "",
      render: (text, record) => {
        
        
        return   <span >{record.invoiceInfo.createdAt}</span>
          
      
      },
    },
   
    {
      title: "Trạng thái",
      dataIndex: "",
      render: (text, record) => {
        
          return <span >{record.invoiceInfo.status}</span>;
     
        
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "",
      render: (text, record) => {
      
        return   <span >{record.invoiceInfo.paymentMethods}</span>
        
      },
    },

    {
      title: "Action",
      dataIndex: "",
      with: "15%",
      key: "x",
      render: (text, record) => (
        <>
          {" "}
          <>
            <Button> Chi tiết</Button>
          </>
        </>
      ),
    },
  ];
  return (
    <div>
      <Row type="flex" className="user-info-container">
        <Col xs={24} md={22} xl={20} style={{ margin: "auto" }}>
          <Row className="rowProfile1">
            <Col xs={0} md={6} style={{ padding: "0 8px" }}>
              <Row>
                <Menu
                  defaultSelectedKeys={["2"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                >
                  <Menu.Item key="1" className="menuItemProfile">
                    <Link to="/profile">Thông tin cá nhân</Link>
                  </Menu.Item>
                  <Menu.Item key="2" className="menuItemProfile">
                    <Link to="/profile/order">Quản lý đơn hàng</Link>
                  </Menu.Item>
                </Menu>
              </Row>
            </Col>
            <Col xs={24} md={18} style={{ padding: "0 8px" }}>
              <div className="cardProfileUser">
                <Row
                  style={{
                    padding: "22px",
                    borderBottom: "1px solid rgb(221, 221, 221)",
                    justifyContent: "space-between",
                  }}
                >
                  <span className="spanTitleOrderTrue">
                    Đơn hàng đang xử lý
                  </span>
                  <span className="spanTitleOrderFalse">
                    {" "}
                    Đơn hàng hoàn thành
                  </span>
                </Row>
                <Divider />
                <Table
                  className="table-food-admin"
                  columns={columns}
                  expandable={{
                    expandedRowRender: (record) => (
                      <p style={{ margin: 0 }}>{record.name}</p>
                    ),
                  }}
                  dataSource={litsInvoice}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    litsInvoice: state.invoiceData.lists,
    user: state.userData.lists,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    invoiceAct: bindActionCreators(invoiceAction, dispatch),
    userAct: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInvoice);
