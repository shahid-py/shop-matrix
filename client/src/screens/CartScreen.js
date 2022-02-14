import "./CartScreen.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//components
import CartItem from "../components/CartItem";

// Actions

import { addToCart, removeFromCart } from "../redux/actions/cartActions";

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

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {}, []);
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  const navigate = useNavigate();

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartSubTotal = () => {
    return cartItems.reduce(
      (price, item) => +price + +item.price * +item.qty,
      0
    );
  };

  


  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    const payment_response = await axios.post(
      `http://localhost:5000/razorpay`,
      {
        amount: getCartSubTotal(),
      }
    );

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const { amount, currency, orderId } = payment_response.data;
    const options = {
      key: "rzp_test_6nxP2p2M8T5UeD",
      currency: currency,
      amount: amount,
      order_id: orderId,
      name: "MATRIX SHOPPING",
      description: "MATRIX Transaction",
      image: "https://razorpay.com/assets/razorpay-glyph.svg",

      handler: async function (response) {
        const paymentVerification = await axios.post(
          `http://localhost:5000/verification`,
          {
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }
        );

        if (paymentVerification.data.success) {
          alert(paymentVerification.data.message);
          navigate("/")
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
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      {cartItems.length ? (
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>ShoppingCart</h2>

            {cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeHandler}
              />
            ))}
          </div>
          <div className="cartscreen__right">
            <h2 className="cart-checkout-heading"> Order Summary </h2>
            <div className="cartscreen__info">
              <p>SUBTOTAL</p>
              <p>Rs. {getCartSubTotal()}</p>
            </div>
            <div>
              <button onClick={displayRazorpay}>Proceed to checkout</button>
              <p> Dummy Debit Card Number: 4111 1111 1111 1111 </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h2> Cart is empty! </h2>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/")}
          >
            Start Shopping!
          </button>
        </div>
      )}
    </div>
  );
};
export default CartScreen;
