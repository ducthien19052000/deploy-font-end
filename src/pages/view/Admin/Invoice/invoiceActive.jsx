import { Button, Form, Input, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import "./index.css";
import moment from 'moment';

const InvoiceActive = ({ invoiceAct, litsInvoice,change }) => {
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const handleCancel = (e) => {
    setIsModal(false);
  };
  const handleChangeActive = (id,date) => {
    fetch(`https://website-fpoly-food.herokuapp.com/invoice/transport/${id}?date=${date}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }

        setData(res.body);

        return res;
      })
      .catch((error) => {});
    handleCancel();
  };
  const fetchEmployee = useCallback(() => {
    const { getData } = invoiceAct;
    getData(change);
  }, [change,invoiceAct]);
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee, isModal]);
 
  const showDetail = (id) => {
    setIsModal(true);
    setId(id);
  };
  const onFinish = values => {
   
    const date =  moment(values.date).format(' DD/MM/YYYY')
    console.log(date)
    fetch(`https://website-fpoly-food.herokuapp.com/invoice/transport/${id}?date=${date}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      console.log(res)
      setData(res.body);

      return res;
    })
    .catch((error) => {console.log(error)});
    handleCancel();
  };
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "Chưa_sử_lý") {
          return <span style={{ fontWeight: "bold" }}>{record.user.name}</span>;
        } else {
          return <span>{record.user.name}</span>;
        }
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "Chưa_sử_lý") {
          return (
            <span style={{ fontWeight: "bold" }}>{record.deliveryAddress}</span>
          );
        } else {
          return <span>{record.deliveryAddress}</span>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "Chưa_sử_lý") {
          return (
            <span style={{ fontWeight: "bold" }}>{record.user.email}</span>
          );
        } else {
          return <span>{record.user.email}</span>;
        }
      },
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "Chưa_sử_lý") {
          return <span style={{ fontWeight: "bold" }}>{record.createdAt}</span>;
        } else {
          return <span>{record.createdAt}</span>;
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "Chưa_sử_lý") {
          return <span style={{ fontWeight: "bold" }}>{record.status}</span>;
        } else {
          return <span>{record.status}</span>;
        }
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "",
      render: (text, record) => {
        if (record.status === "Chưa_sử_lý") {
          return (
            <span style={{ fontWeight: "bold" }}>{record.paymentMethods}</span>
          );
        } else {
          return <span>{record.paymentMethods}</span>;
        }
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
            <Button onClick={() => showDetail(record.id)}> Chi tiết</Button>
            {/* <Button  ><EditFilled /></Button> */}
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        className="table-food-admin"
        columns={columns}
        scroll={{ x: '100vh' }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.name}</p>
          ),
        }}
        dataSource={litsInvoice}
      />

     
        <Modal
        title="Giao hàng"
        footer={null}
        visible={isModal}
     
        onCancel={handleCancel}
      >
         <Form
         onFinish={onFinish}
      
   
      >
        <Form.Item name='date' label='Thời gian giao hàng' >
          <Input type='date'/>
        </Form.Item>
        <Form.Item >
          <Button type='primary' htmlType='submit'>Xác nhận</Button>
        </Form.Item>
        </Form>
      </Modal>
        
    
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    litsInvoice: state.invoiceData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    invoiceAct: bindActionCreators(invoiceAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceActive);
