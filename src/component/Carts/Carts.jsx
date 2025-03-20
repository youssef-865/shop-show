import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

export default function Carts() {
  <Helmet>
  <title>Cart</title>
</Helmet>

  const [product, setProduct] = useState({ products: [], totalCartPrice: 0 });

  let { getProductToCart, updateProductToCart, removeProductFromCart } = useContext(CartContext); 

  async function removeProduct(id) {
    let { data } = await removeProductFromCart(id);
    // console.log("Removed Product:", data);
    setProduct(data.data || { products: [], totalCartPrice: 0 }); 
  }
  
  async function getProduct() {
    let { data } = await getProductToCart();
    // console.log("Fetched Data:", data);
    setProduct(data.data || { products: [], totalCartPrice: 0 }); 
  }

  async function updateProduct(id, count) {
    if (count < 1) return; // Prevent negative quantities
    let { data } = await updateProductToCart(id, count);
    // console.log("Updated Cart:", data);
    setProduct(data.data);
  }


  useEffect(() => {
    getProduct();
  }, []);

  return (
<div className="flex flex-col md:flex-row items-center md:items-start justify-around pt-10 gap-5">
  <div className="w-full md:w-8/12 relative overflow-x-auto shadow-md sm:rounded-lg">
    {product?.products?.length > 0 ? (
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 md:px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-3 md:px-6 py-3">Product</th>
            <th scope="col" className="px-3 md:px-6 py-3">Qty</th>
            <th scope="col" className="px-3 md:px-6 py-3">Price</th>
            <th scope="col" className="px-3 md:px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.products.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-2 md:p-4">
                <img src={item?.product?.imageCover} className="w-10 sm:w-12 md:w-32 max-w-full max-h-full" alt={item?.brand?.name} />
              </td>
              <td className="px-3 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">{item?.product?.title}</td>
              <td className="px-3 md:px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => updateProduct(item?.product?.id, item?.count - 1)} className="cursor-pointer p-1 h-6 w-6 text-gray-500 bg-white border rounded-full hover:bg-gray-100">
                    <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="number" className="bg-gray-50 w-8 sm:w-10 md:w-14 border text-gray-900 text-sm rounded-lg px-2.5 py-1 text-center" value={item.count} readOnly />
                  <button onClick={() => updateProduct(item?.product?.id, item?.count + 1)} className="cursor-pointer p-1 h-6 w-6 text-gray-500 bg-white border rounded-full hover:bg-gray-100">
                    <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-3 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.price}</td>
              <td className="px-3 md:px-6 py-4">
                <button onClick={() => removeProduct(item?.product?.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-xl text-center p-5 text-gray-500">Your cart is empty.</p>
    )}
  </div>

  <div className="w-full max-w-md flex justify-center">
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto p-5">
      <h3 className="text-2xl md:text-3xl text-center font-semibold text-green-600 pt-3">Shopping Cart</h3>
      <p className="text-lg md:text-2xl text-center p-3">
        Total Price: <span>{product.totalCartPrice} EGP</span>
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between ">
      <Link to={'/checkout/'+product?._id} className="mt-3 sm:mt-0 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg md:text-xl px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Check Out
        </Link>
      </div>
    </div>
  </div>
</div>

    
  );
}
