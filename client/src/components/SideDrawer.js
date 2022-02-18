import './SideDrawer.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideDrawer = ({show, click}) => {
    const sideDrawerClass = ["sidedrawer"];

    if (show) {
    sideDrawerClass.push("show");
  }
  const cart= useSelector(state => state.cart);
  const {cartItems} = cart;
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const getCartCount =() => {
    return cartItems.reduce((qty, item) => Number( item.qty) +qty, 0  )
  }
  const getWishlistCount = () => {
    return wishlistItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  return (
    <div className={sideDrawerClass.join(" ")}>
      
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{" "}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <i className="fa-regular fa-bookmark"></i>
            <span>
              Wishlist{" "}
              <span className="sidedrawer__cartbadge">{getWishlistCount()}</span>
            </span>
          </Link>
        </li>
        
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;