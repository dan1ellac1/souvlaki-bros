import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
const contentStyle = {
  borderRadius: "10px", 
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#000000',
};
const ProductShowcase = () => (
  <Carousel autoplay className='border rounded-xl'>
    
    <div>
      <h3 style={contentStyle}><Link className='hover:text-white hover:font-bold text-center text-2xl ml-[25%] mr-[25%] text-white rounded-3xl' to="/products">Our Menu</Link></h3>
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
    <div>
      <h3 style={contentStyle}>5</h3>
    </div>
    
  </Carousel>
);
export default ProductShowcase;