import "./WishlistItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, } from "react";
import { useDispatch } from "react-redux";


import { addToCart } from "../redux/actions/cartActions";



const WishlistItem = ({ item, removeHandler}) => {
  const history = useNavigate()
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const addToCartHandler =() => {

    dispatch(addToCart(item.product, qty));
    history("/cart");
  };
 

  return (
    <div className="wishlistitem">
    
      <div className="wishlistitem__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="wishlistitem__name">
        <p>{item.name}</p>
      </Link>
      <p className="wishlistitem__price">
      Price : <span> Rs. {item.price}/-</span></p>
      
      <select
        className="wishlistitem__select"
        value={qty}
        onChange={(e) => setQty( e.target.value)}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>

        
      <button
        className="wishlistitem__deleteBtn"
        onClick={() => removeHandler(item.product)}
      >
    
        Remove from wishlist
      </button>
      <p>
      <button
        className="button"
        onClick={() => addToCartHandler(item.product ,qty)}
      >
    
        ADD TO CART
      </button>  
              </p>
        
    </div>
        
    
  
  );
};

export default WishlistItem;
