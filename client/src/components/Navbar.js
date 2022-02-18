import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  const getWishlistCount = () => {
    return wishlistItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>MATRIX</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="link">
            <div className="badge-icon">
              <i class="fa-solid fa-cart-shopping"></i>

              <span className="badge-icon-value">{getCartCount()}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="link">
          <div className="badge-icon">
            <i class="fa-regular fa-bookmark"></i>
            
              <span className="badge-icon-value">{getWishlistCount()}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/" className="home__links">
            HOME
          </Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
