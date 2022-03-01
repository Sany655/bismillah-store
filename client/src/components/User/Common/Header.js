import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import cartIcon from "../../../assets/svs/shopping-cart.svg"
import { ClearCart } from '../../../redux/cart/CartActions'
import { searchProducts, getProducts, loadingProducts, productError } from '../../../redux/products/productActions'
import axios from 'axios'
import { AuthError, LogoutAction } from '../../../redux/auth/AuthActions'

function Header() {
    const cart = useSelector(state => state.cart).products
    const total = useSelector(state => state.cart).total
    const searchData = useSelector(state => state.products).searchData
    const product = useSelector(state => state.products).product
    const auth = useSelector(state => state.auth).auth
    const user = useSelector(state => state.auth).user
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadingProducts());
        if (localStorage.getItem('products') != null) {
            dispatch(getProducts(JSON.parse(localStorage.getItem('products'))))
            dispatch(loadingProducts());
        } else {
            axios.get('https://fakestoreapi.com/products').then((response => {
                dispatch(getProducts(response.data));
                localStorage.setItem('products', JSON.stringify(response.data))
            })).catch(error => {
                dispatch(productError(error.message));
            }).finally(() => {
                dispatch(loadingProducts());
            })
        }
    }, []);

    function logout() {
        axios.post('/logout', { _id: user._id }).then(res => {
            if (res.data.ok) {
                dispatch(LogoutAction())
            }
        }).catch(error => {
            dispatch(AuthError(error.message));
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky top-0" style={{ zIndex: 100 }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={'/'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={'/products'}>Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={'/my-orders'}>My orders</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {
                            auth ? (
                                <li className="nav-item">
                                    <a className="nav-link" style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={'/register'}>Registration</NavLink>
                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link mx-4 position-relative" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={cartIcon} alt="" className='w-6' />
                                {
                                    cart.length > 0 && <span className="position-absolute top-5 start-95 translate-middle badge rounded-pill bg-danger">{cart.length}</span>
                                }
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {cart.length ? (
                                    <>
                                        {cart.map(c => (
                                            <li title={c.title} key={c.id} className="dropdown-item d-flex justify-content-between align-items-center"><a className="text-decoration-none text-dark">{c.title.substring(0, 5) + '..'} {c.quantity}*{c.price}</a></li>
                                        ))}
                                        <li><a className="dropdown-item">Total : {total}</a></li>
                                        <li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => dispatch(ClearCart())}>Clear Cart</a></li>
                                        <li><Link to="/cart" className="dropdown-item">Manage Cart</Link></li>
                                    </>
                                ) : (
                                    <li><a className="dropdown-item">Empty</a></li>
                                )}
                            </ul>
                        </li>
                    </ul>

                    <form className="d-flex" onSubmit={(e) => {
                        e.preventDefault()
                        if (searchData.length > 0) {
                            const a = searchData.find(a => a.title.includes(e.target.search.value))
                            if (a.id) {
                                navigate('/product/' + a.id)
                            } else {
                                alert('Not found')
                            }
                        }
                    }}>
                        <input className="form-control me-2" list="datalistOptions" id="exampleDataList" placeholder="Search" onChange={(e) => dispatch(searchProducts(e.target.value))} name="search" type={'search'} autoComplete="off" />
                        <datalist id="datalistOptions">
                            {
                                searchData.map(s => (
                                    <option value={s.title} key={s.id} />
                                ))
                            }
                        </datalist>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div >
            </div >
        </nav >
    )
}

export default Header