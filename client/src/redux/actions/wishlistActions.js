import * as actionTypes from "../constants/wishlistConstants";
import axios from "axios";

export const addToWishlist = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_WISHLIST,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("wishlist", JSON.stringify(getState().wishlist.wishlistItems));
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_WISHLIST,
    payload: id,
  });

  localStorage.setItem("wishlist", JSON.stringify(getState().wishlist.wishlistItems));
};