import './CartScreen.css'
import CartItem from '../components/CartItem';
const CartScreen = () => {
  return <div className="cartscreen">
      <div className="cartscreen__left">
      <h2> Shopping Cart</h2>
      <CartItem/>
      </div>

      <div className="cartscreen__right">

      </div>
  </div>;
};

export default CartScreen;
