import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import NotFound from './component/NotFound/NotFound';
import Brand from './component/Brand/Brand';
import Carts from './component/Carts/Carts';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Logout from './component/Logout/Logout';
import { UserContextProvider } from './context/UserContext';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ Correct Import
import CheckOut from './component/CheckOut/CheckOut';
import AllOrder from './component/AllOrder/AllOrder';
import { Offline } from 'react-detect-offline';
import Products from './component/Products/Products';

const queryClient = new QueryClient();

function App() {

  let routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: 'login', element: <Login  /> },
        { path: 'logout', element: <Logout /> },
        { path: 'register', element: <Register /> },
        { index: true, element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: 'brand', element: <ProtectedRoute> <Brand /> </ProtectedRoute> },
        { path: 'checkout/:cartId', element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute> <AllOrder/> </ProtectedRoute> },


        { path: 'productDetails/:id/:category', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: 'carts', element: <ProtectedRoute> <Carts /> </ProtectedRoute> },
        { path: 'home', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ] , 
  { basename: "/shop-show" } 

);

  return (
    <QueryClientProvider client={queryClient}>  {/* ✅ Wrap the entire app */}
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers} />
          <div className='fixed bottom-4 left-4 text-green-400 bg-green-100 text-xl'>
          <Offline>Only shown offline (surprise!) </Offline>
         </div>
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
