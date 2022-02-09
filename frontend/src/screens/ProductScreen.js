import './ProductScreen.css'
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';





// Actions
import { getProductDetails } from '../redux/actions/productActions';
import {addToCart} from '../redux/actions/cartActions';


const ProductScreen = () => {

  const history = useNavigate()
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;
  const { id } = useParams();

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }// eslint-disable-next-line
  }, [dispatch, product]);

  const addToCartHandler =() => {

    dispatch(addToCart(product._id, qty));
    history("/cart");
  };
  return (
    <div className="productscreen">
      {loading ? <h2>loading...</h2> : error ? <h2>{error}</h2> :(
        <>
        <div className="productscreen__left">
        <div className="left__image">
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="left__info">
          <p className="left__name">{product.name}</p>
          <p>Price: Rs. {product.price}/-</p>
          <p>
            Description:{product.description}
          </p>
        </div>
      </div>

      <div className="productscreen__right">
        <div className="right__info">
          <p>
            Price : <span> Rs. {product.price}/-</span>
          </p>
          <p>
            status: <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
          </p>
          <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
          <p>
          <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
          </p>
        </div>
      </div>
        </>
      )};
      
    </div>
  );
};

export default ProductScreen;
