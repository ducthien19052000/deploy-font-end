import { Col, Input, Modal, notification, Row } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import confirm from "antd/lib/modal/confirm";

import React, { useState } from "react";

const EditCart = ({
  item,
  visible,
  handleCancel,
  onHandleRemoveCart,
  onUpdatePrToCart,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setQuantity(value);
    console.log(value);
  };
  const handleDeletePrCart = (product, topping) => {
    onHandleRemoveCart(product, topping);
    handleCancel();
  };
  const onUpdateToCart = (product, quantity, topping) => {
    confirm({
      title: "Bạn muốn cập nhật giỏ hàng?",
      content: `Sản phẩm :${product.productName} x ${quantity}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onUpdatePrToCart(product, quantity, topping);
        setQuantity(0);
        notification["success"]({
          message: "",
          duration: 2,
          description: "Cập nhật giỏ hàng thành công",
        });
        handleCancel();
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Modal
        title={item.product.productName}
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <div
          className="itemDetailCartQuantity"
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          <div>
            <Row className="rowImageEditCart">
              <Col xs={24} md={16} style={{ height: "100px" }}>
                <span>
                  <img src={item.product.image} style={{ height: "100%" }} />
                </span>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ margin: "10px 0", textAlign: "center" }}>
                  <span className="spanPriceDetailItem">
                    <Input
                      className="inputShowQuantity"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="number"
                      min={0}
                      max={99}
                      value={quantity}
                      onChange={onHandleChange}
                    />
                  </span>
                </div>
                <span className="spanShowQuantity">
                  Giá: {item.product.price} đ/{item.product.unit}
                </span>
              </Col>
            </Row>
           {item.topping.length!==0&&<>
            <Row
              type="flex"
              className="rowCartChangeTopping"
              style={{ marginBottom: "20px" }}
            >
              <Col xs={24} md={8}></Col>
              <Col xs={24} md={8}>
                Tên
              </Col>
              <Col xs={24} md={8}>
                Giá
              </Col>
            </Row>
            {item.topping.map((value,index)=>(
                  <Row style={{margin:'10px 0'}} key={index}>
                  <Col xs={24} md={8} >
                  <img
              width="50px" height='50px'
              src="https://tse4.mm.bing.net/th?id=OIP.Pd_SHEfWBTat_af-uSgppAHaJ4&pid=Api&P=0&w=300&h=300"
            />
                  </Col>
                  <Col xs={24} md={8}>
                    {value.topping.name}
                  </Col>
                  <Col xs={24} md={8}>
                    {value.topping.price}
                  </Col>
                </Row>
            ))}</>}
          
            {quantity > 0 && (
              <Row className="cart__button">
                <span
                  className="btn__label"
                  onClick={() =>
                    onUpdateToCart(item.product, quantity, item.topping)
                  }
                >
                  Cập nhật
                </span>
              </Row>
            )}
            {quantity === "0" && (
              <Row className="cart__button">
                <span
                  className="btn__label"
                  onClick={() => handleDeletePrCart(item.product, item.topping)}
                >
                  Xóa
                </span>
              </Row>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditCart;
