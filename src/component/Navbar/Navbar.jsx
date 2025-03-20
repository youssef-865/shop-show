import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ Fixed incorrect import
import img from "../../assets/img/freshcart-logo.svg";
import { UserContext } from '../../context/userContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  
  let {cartNumber,getProductToCart} = useContext(CartContext)
  let { isLogin, setLogin } = useContext(UserContext);
  let navigate = useNavigate(); // ✅ Fixed variable name (Navigate → navigate)

   async function getProduct(){
    await getProductToCart()
   }

   useEffect(()=>{
    getProduct()
   },[])

  function logout() {
    localStorage.removeItem("userToken");
    setLogin(null);
    navigate("/login"); //  path (./login → /login)
  }

  return (
    <nav className='bg-slate-300 shadow-sm p-4'>
      <div className='flex flex-col lg:flex-row justify-between items-center'>

        {/*Logo Section */}
        <div className='flex flex-col lg:flex-row items-center gap-4'>
          <img src={img} alt="FreshCart" width={110} />

          {isLogin && (
            <ul className='flex py-3   lg:flex-row gap-4'>
              <li className='px-3 '><NavLink to="/">Home</NavLink></li>  {/* ✅ Fixed empty path */}
              <li className='px-3 '><NavLink to="/brand">Brand</NavLink></li>
              <li className='px-3  relative'><NavLink to="/carts">Carts
              <span className="bg-green-100 text-green-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300 absolute left-12 top-0">{cartNumber}</span>
              </NavLink></li>
            </ul>
          )}
        </div>

        {/*  Social Media & Auth Section */}
        <div className='flex flex-col lg:flex-row items-center gap-4'>

          {/*  Social Media Icons (Only visible when logged in) */}
          {isLogin && (
            <div className='flex gap-2'>
              <i className='fab fa-facebook p-2'></i>
              <i className='fab fa-youtube p-2'></i>
              <i className='fab fa-instagram p-2'></i>
            </div>
          )}

          {/*  Authentication Links */}
          <ul className='flex flex-col lg:flex-row items-center gap-4'>
            {!isLogin ? (
              <>
                <li className='px-3 py-2'><NavLink to="/register">Register</NavLink></li>
                <li className='px-3 py-2'><NavLink to="/login">Login</NavLink></li>
              </>
            ) : (
              <li className='px-3 py-2 cursor-pointer'>
                <span onClick={logout} className="text-red-600 font-semibold">Logout</span>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}
