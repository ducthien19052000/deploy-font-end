import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as invoiceAction from "../../../../redux/Action/invoiceAction";
import "./index.css";
import InvoiceDetail from "./invoiceDetail";

const InvoiceSuccess = ({ invoiceAct, litsInvoice,change }) => {
    const [isModal, setIsModal] = useState(false);
    const [id,setId] = useState()
    const handleOk = (e) => {
      setIsModal(false);
    };
    console.log(change)
    const handleCancel = (e) => {
      setIsModal(false);
    };
      const fetchEmployee = useCallback(() => {
          const { getData } = invoiceAct;
          getData(change);
        }, [change]);
        useEffect(() => {
          fetchEmployee();
        }, [fetchEmployee,isModal]);
        console.log(litsInvoice)
        const showDetail=(id) =>{
          setIsModal(true);
          setId(id)
        }
    const columns = [
      {
        title: "Tên khách hàng",
        dataIndex: "",
      render: (text,record) => {
        if(record.status==="Chưa_sử_lý"){
        return <span style={{fontWeight:'bold'}}>{record.user.name}</span>
        }
        else{
          return <span >{record.user.name}</span>
        }
      },
      },
      {
        title: "Địa chỉ",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.deliveryAddress}</span>
          }
          else{
            return <span >{record.deliveryAddress}</span>
          }
        },
      },
      {
        title: "Email",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.user.email}</span>
          }
          else{
            return <span >{record.user.email}</span>
          }
        },
      
  
      },
      {
        title: "Ngày đặt hàng",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.createdAt}</span>
          }
          else{
            return <span >{record.createdAt}</span>
          }
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.status}</span>
          }
          else{
            return <span >{record.status}</span>
          }
        },
      },
      {
        title: "Hình thức thanh toán",
        dataIndex: "",
        render: (text,record) => {
          if(record.status==="Chưa_sử_lý"){
          return <span style={{fontWeight:'bold'}}>{record.paymentMethods}</span>
          }
          else{
            return <span >{record.paymentMethods}</span>
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
              <Button onClick= {()=>showDetail(record.id)}> Chi tiết</Button>
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
             
            {isModal === true ? (
            <InvoiceDetail
            id={id}
            visible={isModal}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          ) : (
            ""
          )}
        
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
  
export default  connect(mapStateToProps, mapDispatchToProps)(InvoiceSuccess)
