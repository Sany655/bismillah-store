import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/User/Common/Header';
import Login from '../components/User/Auth/Login';
import Register from '../components/User/Auth/Register';
import Cart from '../components/User/Cart/Cart';
import Checkout from '../components/User/Checkout/Checkout';
import Home from '../components/User/Home/Home';
import Orders from '../components/User/Orders/Orders';
import Product from '../components/User/Product/Product';
import Products from '../components/User/Products/Products';

function UserRoutesContainer() {
    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/product/:id' element={<Product />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
                <Route path='/my-orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
                <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
            </Routes>
        </React.Fragment>
    )
}

function PrivateRoute({ children }) {
    let auth = useSelector(store => store.auth).auth;
    let location = useLocation();
  
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

function GuestRoute({ children }) {
    let auth = useSelector(store => store.auth).auth;
    let location = useLocation();
    if (auth) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }

export default UserRoutesContainer