import React from 'react'


import { Carousel } from 'antd';
const contentStyle = {
  borderRadius:"5px",
  height: "40vh",
  margin: 0,
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'black',
};
const ProductShowcase = () => (
  <>
    <Carousel arrows infinite={true} autoplay autoplaySpeed={2000} pauseOnHover>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </>
);
export default ProductShowcase;