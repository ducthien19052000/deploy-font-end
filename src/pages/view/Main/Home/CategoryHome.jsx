import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import { Link } from 'react-router-dom'
import ProductItemHome from './ProductItemHome'

const CategoryHome = ({newProduct, onAddToCart}) => {
  const [product,setProduct] = useState([])
  useEffect(() => {
    fetch(
      `https://website-fpoly-food.herokuapp.com/menu/${newProduct.id}?page=0&size=6`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "*/*",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkdWN0aGllbjE5MDUyMDAwQGdtYWlsLmNvbSIsImlhdCI6MTYwNjY0MzYxNCwiZXhwIjoxNjA3NTA3NjE0fQ.XJMMZAhZ9OrtN3eRTnAPj018TZXANwCASmdLfniF7rAjumeGJ2w0ObyIjQ7EhTstJTm4_OuLOAzT4dDnx3S1PQ`

        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProduct(response.body.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if(product.length===0){
    return <></>
  }
  else{
    return (
      <div className="site-layout-background-main-home">
           <Row style={{ marginLeft: "35px",marginTop:'20px' }}>
            <Row style={{ width: "100%", display: "block" }}>
            <h2 style={{ float: "left" }}>{newProduct.name}</h2>
              <Link
                to="/product"
                type="button"
                className="ant-btn ant-btn-dashed"
                style={{
                  float: "right",
                  marginRight: "30px",
                  background: "#ed7100",
                }}
              >
                <span className='spanChiTietHome'>Xem chi tiết</span>
              </Link>
            </Row>
            <Row className="row-food-home">
              {product.map((food, index) => (
                <ProductItemHome
                  product={food}
                  key={index}
                  onAddToCart={onAddToCart}
                />
              ))}
            </Row>

           

           
          </Row>
      </div>
  )
  }
}

CategoryHome.propTypes = {

}

export default CategoryHome
