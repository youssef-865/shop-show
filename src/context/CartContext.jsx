import React, { createContext, useState } from 'react';
import axios from 'axios';

export let CartContext = createContext();

export default function CartContextProvider(props) {

  const [cartNumber, setcartNumber] = useState(0)
 
  function addProductToCart(productId) {
    let headers = {
      token: localStorage.getItem("userToken"), 
    };

    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId }, 
        { headers: headers }
      )
      .then((response) =>{
        // console.log('response',response)
        setcartNumber(response.data.numOfCartItems)
        return response
      } )
      .catch((err) => err);
  }

  function getProductToCart() {
    let headers = {
      token: localStorage.getItem("userToken"), 
    };

    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        
        { headers: headers }
      )
      .then((response) =>{
         
        setcartNumber(response.data.numOfCartItems)
        return response
      } )
      .catch((err) => err);
  }

  function updateProductToCart(productId,count) {
    let headers = {
      token: localStorage.getItem("userToken"), 
    };

    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count:count
        },
        
        { headers: headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

   
  function removeProductFromCart(productId) {
    let headers = {
      token: localStorage.getItem("userToken"), 
    };
  
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
      .then((response) =>{
        
        setcartNumber(response.data.numOfCartItems)
        return response
      } )
      .catch((err) => err);
  }
  

  return (
    <CartContext.Provider value={{ addProductToCart ,getProductToCart,updateProductToCart , removeProductFromCart ,cartNumber}}> {/* ✅ Wrapped in an object */}
      {props.children}
    </CartContext.Provider>
  );
}



