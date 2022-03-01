import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

function Header() {
    const company = useSelector(store => store.company).company;
    function logout() {
        axios.post('/company/logout', { _id: company._id }).then(res => {
            if (res.data.ok) {
                dispatch({type:"COMPANY_LOGOUT"})
            }else{
                dispatch({type:"COMPANY_ERROR",payload:res.data});
            }
        }).catch(error => {
            dispatch({type:"COMPANY_ERROR",payload:error.message});
        })
    }
    const dispatch = useDispatch()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/company'}>Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        useSelector(store => store.company).auth ? (
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact="true" to="">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="products">Products</NavLink>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item"><a onClick={logout} style={{ cursor: "pointer" }} className="nav-link">Logout</a></li>
                                </ul>
                            </>
                        ) : (
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="register">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header