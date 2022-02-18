import "./WishlistScreen.css"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";


import WishlistItem from "../components/WishlistItem"

import { addToWishlist, removeFromWishlist} from "../redux/actions/wishlistActions";


const WishlistScreen = () => {

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);
    const {wishlistItems} = wishlist;
    useEffect(() => {}, []);
  

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToWishlist(id, qty));
  }

    const navigate = useNavigate();

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
      };
     
    
      
      
  
  return (
    <div>
      {wishlistItems.length ? (
        <div className="wishlistscreen">
          
            <h2>Wishlist</h2>

            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromWishlistHandler}
                
              />
              
            ))}
            </div>
            

            
            
  ):(<div className="cart-empty">
  <h2> Wishlist is empty! </h2>
  <button
    className="btn btn-primary btn-large"
    onClick={() => navigate("/")}
  >
    Start Shopping!
  </button>
</div>
)}
</div>
  )
            }

export default WishlistScreen;