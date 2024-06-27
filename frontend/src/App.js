import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Shop from './Components/Shop';
import Cart from './Components/Cart';
import WatchState from './Context/WatchContext';
import AdminLogin from './Components/AdminLogin';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminPortal from './Components/AdminPortal';
import PlaceOrder from './Components/PlaceOrder';





function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/><Footer/></>,
    },
    {
      path : "/Shop/:categoryName",
      element: <><Navbar/><Shop/><Footer/></>,
    },
    {
      path: "/Cart",
      element: <><Navbar/><Cart/><Footer/></>
    },
    {
      path: "/AdminLogin",
      element: <><Navbar/><AdminLogin/><Footer/></>
    },
    {
      path: '/AdminPortal',
      element: <><AdminPortal/><Footer/></>
    },
    {
      path: '/PlaceOrder',
      element: <><Navbar/><PlaceOrder/><Footer/></>
    }
  ]);


  return (
    <WatchState>
      <RouterProvider router={router} />
    </WatchState>
  );
}

export default App;
