import './Product.css';
import { Link } from 'react-router-dom';
const Product = () => {
  return <div className='product'>
      <img src= "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1463&q=80" alt=''/>
      <div className='product__info'>

     <p className='info__name'>Product info</p>
     <p className='info__description'>
     Voluptate consectetur exercitation qui anim magna qui quis tempor. Ea ipsum anim eiusmod do cillum culpa veniam excepteur quis duis. Reprehenderit elit occaecat cupidatat reprehenderit.
     </p>
     <p>
         rs499.99
     </p>
     <Link to={`/product/${1111}`} className='info__button'>View</Link>
      </div>
  </div>;
};

export default Product;
