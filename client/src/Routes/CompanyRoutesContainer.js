import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/Company/Header';
import Home from '../components/Company/Home';
import Login from '../components/Company/Login';
import Products from '../components/Company/Products';
import Register from '../components/Company/Register';

function CompanyRoutesContainer() {
    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path='/' element={<CompanyRoute><Home /></CompanyRoute>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/products' element={<Products />} />
            </Routes>
        </React.Fragment>
    )
}

function CompanyRoute({ children }) {
    const auth = useSelector(store => store.company).auth
    let location = useLocation();
    if (!auth) {
        return <Navigate to="/company/login" state={{ from: location }} replace />;
    } else {
        return children;
    }
}

export default CompanyRoutesContainer