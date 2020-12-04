import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../../../redux/Action/categoryAction";
import * as foodAction from "../../../../redux/Action/index";
import ModalAddEmployee from "../ModalAdd";
import ModalEditFood from "../ModalEdit/editFood";
import "./index.css";

const Food = ({ foodAct, litsFoot, listGroup, categoryAct }) => {
  const [isModal, setIsModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [productEdit,setProductEdit] = useState({})

  const handleOk = (e) => {
    setIsModal(false);
  };
  const handleCancel = (e) => {
    setIsModal(false);
  };
  const handleOkEdit = (e) => {
    setIsModalEdit(false);
  };
  const handleCancelEdit = (e) => {
    setIsModalEdit(false);
  };
  const fetchEmployee = useCallback(() => {
    const { getData } = foodAct;
    const { getDataCategory } = categoryAct;
    getDataCategory();
    getData();
  }, [foodAct, categoryAct]);
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleAddFood = (data) =>{
    const {addData} = foodAct;
    addData(data);
    handleCancel()
  }

  const handleEditFood=(data,id)=>{
    const {editData} = foodAct;
    editData(data,id);


  }

  const handleRemoveFood=(id)=>{
    const {deleteData} = foodAct;
    deleteData(id)
    console.log(id)
  }

  const showModalEdit=(data)=>{
    setProductEdit(data)
    setIsModalEdit(true)
  } 

  const columns = [
    {
      title: "Tên món ăn",
      dataIndex: "productName",
      fixed: 'left',
      with: "10%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      with: "10%",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      with: "10%",
      render: (text) => (
        <img style={{ height: "70px", width: "80px" }} src={text} />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      with: "10%",
      render: (text) => <span>{text.categoryName}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      with: "10%",
      ellipsis: {
        showTitle: false,
      },
      render: description => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
      
    },
  
    {
      title: "",
      dataIndex: "",
      with: "10%",
      fixed: 'right',
      key: "x",
      render: (text, record) => (
          <>
            <Button onClick={()=>handleRemoveFood(record.id)}>
              <DeleteFilled />
            </Button>
            <Button>
              <EditFilled  onClick={()=>showModalEdit(record)}/>
            </Button>
          </>
        
      ),
    },
  ];

  const showModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <Row className="title-content-admin">
        <h4 className="title-h4">Quản lý món ăn</h4>
      </Row>
      <Row className="site-layout-content-admin">
        <Col xs={24} lg={24}>
          <Row className="top-content-food">
            <Col xs={24} lg={12} className="col-add-food">
              <Button size="large" type='primary' className='btn__addAdmin' onClick={showModal}>
                Thêm món ăn
              </Button>
            </Col>
            <Col span={6}></Col>
            <Col xs={24} lg={5} className="col-search-food">
              <Search
                placeholder="Tìm món ăn"
                size="large"
                enterButton
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={24}>
              <Table
                className="table-food-admin"
                columns={columns}
                scroll={{ x: '100vh' }}
                expandable={{
                  expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}>{record.name}</p>
                  ),
                }}
                dataSource={litsFoot}
              />
            </Col>
          </Row>
        </Col>
        {isModal === true ? (
          <ModalAddEmployee
            isModal={isModal}
            addFood={handleAddFood}
            category={listGroup}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
        {isModalEdit === true ? (
          <ModalEditFood
            isModal={isModalEdit}
            editFood={handleEditFood}
            product={productEdit}
            category={listGroup}
            handleOk={handleOkEdit}
            handleCancel={handleCancelEdit}
          />
        ) : (
          ""
        )}
      </Row>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    litsFoot: state.foodData.lists,
    listGroup: state.groupData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAct: bindActionCreators(foodAction, dispatch),
    categoryAct: bindActionCreators(categoryAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
