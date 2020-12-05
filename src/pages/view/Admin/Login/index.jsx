import { Button, Carousel, Col, Divider, Form, Input, Row } from "antd";
import React from "react";
import "./index.css";
const Login = () => {

  const onFinish = (values) => {
    console.log("Success:", values);
  };

 
  return (
    <>
      <Row className='container-Login'>
        <Col xs={0} md={8}>
          <Carousel className='slide-login' autoplay  effect="scrollx">
            <div>
              <h3 className='contentStyle '>1</h3>
            </div>
            <div>
              <h3 className='contentStyle '>2</h3>
            </div>
            <div>
              <h3 className='contentStyle '>3</h3>
            </div>
          
          </Carousel>
        </Col>
        <Col xs={24} md={16} className='col-formLogin'>
          <Col xs={24} md={18} style={{padding:'20px'}}>
            <div className='logo'></div>
            <h4 style={{fontWeight:400}}>
              <div style={{fontSize:'2rem'}}>Welcome back,</div>
              <span style={{fontSize:'1.5rem'}} >
              Please sign in to your account.
              </span>
            </h4>
            <Divider/>
            <div>
              <Form layout={'vertical'} onFinish={onFinish}>
                <Row>
                  <Col xs={24} md={12} className='col-input-form-login'>
                    <Form.Item name='username' label='Email'>
                      <Input className='input-login ' placeholder='Email here...'/>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}  className='col-input-form-login'>
                  <Form.Item name='password' label='Password'>
                      <Input.Password value='' className='input-login' placeholder='Password here...'/>

                    </Form.Item>
                  </Col>
                 
                </Row>
                <Row>
                <Divider style={{margin:'0 0 10px 0'}}/>
                </Row>
                <Row >
                  <Form.Item>
                    <Button type='primary' style={{fontSize:'15px',fontWeight:500,borderRadius:'3px',background:'#545cd8'}}>Login</Button>
                  </Form.Item>
                </Row>
              </Form>
            </div>
          </Col>
          
        </Col>
      </Row>
    </>
  );
};

export default Login;
