import { Button, Col, Image, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";

const InvoiceDetail = ({
  visible,
  handleOk,
  handleCancel,
  handleChangeActive,
  id,
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://website-fpoly-food.herokuapp.com/invoice/details/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        setData(res.body);

        return res;
      })
      .catch((error) => {});
  }, [id]);
  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text, record) => 
      <img src={record.productInfo.image} style={{ width: "96px" }} />
    },
    {
      title: "Tên món ăn",
      dataIndex: "",
      render: (text, record) => 
       
            <span style={{ fontWeight: "bold" }}>{record.productInfo.productName}</span>
          
    },
    {
      title: "Giá",
      dataIndex: "",
      render: (text, record) => 
       
            <span style={{ fontWeight: "bold" }}>{record.productInfo.price}</span>
          
    },
    {
      title: "Số lượng",
      dataIndex: "",
      render: (text, record) => 
       
            <span style={{ fontWeight: "bold" }}>{record.productInfo.quantity}</span>
          
    },
    {
      title: "Thành tiền",
      dataIndex: "",
      render: (text, record) => 
       
            <span style={{ fontWeight: "bold" }}>{record.productInfo.amount}</span>
          
    },
   
  ];
  console.log(data)
  return (
    <Modal
      title="Chi tiết"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1200}
      footer={null}
    >
      {data && (
        <Row>
          <Col xs={24} md={6}>
            <div className="invoice__detailInfoUser">
              <Row>
                <h2>Thông tin khách hàng</h2>
              </Row>

              <p>{data.invoiceInfo.fullName}</p>
              <Row>
                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                  Email{" "}
                </p>
                <p> {data.invoiceInfo.user.email}</p>
              </Row>
              <Row>
                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                  Giao tại{" "}
                </p>
                <p> {data.invoiceInfo.deliveryAddress}</p>
              </Row>
              <Row>
                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                  Phương thức thanh toán{" "}
                </p>
                <p> {data.invoiceInfo.paymentMethods} </p>
              </Row>
              <Row>
                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                  Thời gian đặt hàng{" "}
                </p>
                <p> time</p>
              </Row>
              <Row>
                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                  Ghi chú
                </p>
                <p> {data.invoiceInfo.description}</p>
              </Row>
              <Row>
                <p style={{ width: "100%", margin: 0, fontWeight: "bold" }}>
                  Tổng tiền
                </p>
                <p> {data.invoiceInfo.amountTotal}</p>
              </Row>
              <Row style={{ paddingBottom: "5px" }}>
                <Col span={12}>
                  <div style={{}}>
                    <Button
                      onClick={() => handleChangeActive(id)}
                      type="primary"
                    >
                      Nhận đơn hàng
                    </Button>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ padding: "0 10px" }}>
                    <Button>Hủy đơn hàng</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={24} md={18}>
            <Table
              className="table-food-admin"
              columns={columns}
              scroll={{ x: "100vh" }}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.toppingList}</p>
                ),
              }}
              dataSource={data.cartProduct}
            />

           
          </Col>
        </Row>
      )}
      {data === null && <></>}
    </Modal>
  );
};

export default InvoiceDetail;
