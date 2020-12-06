import { Col, Row } from "antd";
import React from "react";
import ChartsPage from "./chartData";
import "./index.css";

const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span style={{fontWeight:500}}> Hóa đơn mới</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
                    8
                </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span  style={{fontWeight:500}}> Hóa đơn đang chế biến</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
                    8
                </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span  style={{fontWeight:500}}> Hóa đơn vận chuyển</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
                    8
                </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span  style={{fontWeight:500}}> Hóa đơn hoàn thành</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
                    8
                </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row style={{ maxHeight: "500px" }}>
        <ChartsPage />
      </Row>
    </div>
  );
};

export default Dashboard;
