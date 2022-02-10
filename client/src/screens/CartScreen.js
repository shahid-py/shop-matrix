import './CartScreen.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//components
import CartItem from '../components/CartItem';

// Actions

import {addToCart, removeFromCart} from  '../redux/actions/cartActions';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const __DEV__ =document.domain === 'localhost'



const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {}, []);
  const qtyChangeHandler =(id, qty) => {
    dispatch(addToCart(id, qty))
  }

  const removeHandler =(id) => {
    dispatch(removeFromCart(id))
  }

  const getCartCount= () =>{
    return cartItems.reduce((qty, item) => ( item.qty) +qty, 0 );
  }

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) =>+price + +item.price * +item.qty, 0)
      
  };

  async function displayRazorpay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    

    const payment_response = await axios.post(`http://localhost:5000/razorpay`,{
      amount:getCartSubTotal()
  })

    if(!res) {
      alert('Razorpay SDK failed to load')
      return;
    }
    const { amount, currency, orderId } = payment_response.data;
    const options = {
      key: __DEV__ ? 'rzp_test_6nxP2p2M8T5UeD'  : 'API_NOT_AVAILABLE',
      currency: currency,
      amount:amount,
      order_id: orderId,
      name: "MATRIX SHOPPING",
      description: "MATRIX Transaction",
      image: "https://razorpay.com/assets/razorpay-glyph.svg",
       
      handler: async function (response){
        const paymentVerification = await axios.post(
          'http://localhost:5000/razorpay/verification',
          {
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }
        );

        if (paymentVerification.data.success) {
          alert(paymentVerification.data.message);
          removeHandler()
          
        } else {
          alert("something went wrong");
        }
      },
      prefill: {
          name: "tester",
          email: "test@gmail.com",
        contact: "1234567890",
      },
      
      theme: {
          color: "#3399cc"
      }
  }
  const paymentObject = new  window.Razorpay(options);
  paymentObject.open();
  }
  

 


  return(
     <div className="cartscreen">
      <div className="cartscreen__left">
      <h2> Shopping Cart</h2>
      {cartItems.length=== 0 ? (
        <div>
          Your cart is empty <Link to="/">Go Back</Link>
          </div>
      ) : (
      cartItems.map((item)=> (
       <CartItem 
       key={item.product}
       item={item}
        qtyChangeHandler ={qtyChangeHandler} 
        removeHandler={removeHandler}/>
     ))

     )}
      
      </div>

      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p>subtotal({getCartCount()}) items</p>
          <p>Rs. {getCartSubTotal()}</p>
        </div>
       <div>
       <button onClick={displayRazorpay} >Proceed To Checkout</button>
       </div>
      </div>
  </div>
  );
};
export default CartScreen;


