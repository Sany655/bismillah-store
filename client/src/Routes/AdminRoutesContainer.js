import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminLogin from '../components/Admin/Auth/AdminLogin'
import Home from '../components/Admin/Home/Home'
import Header from '../components/Admin/Common/Header'

function AdminRoutesContainer() {
    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path='' element={<AdminRoute><Home /></AdminRoute>} />
                <Route path='login' element={<AdminLogin />} />
            </Routes>
        </React.Fragment>
    )
}

function AdminRoute({ children }) {
    const admin = useSelector(store => store.admin).admin
    let location = useLocation();
    if (!admin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    } else {
        return children;
    }
}

export default AdminRoutesContainer