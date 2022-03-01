import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ClearCart, DecreaseItem, IncreaseItem, RemoveFromCart } from '../../../redux/cart/CartActions'

function Cart() {
    const cart = useSelector(state => state.cart).products
    const total = useSelector(state => state.cart).total
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body">
                    {
                        cart.length > 0 ? (
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Qurantity</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map(c => (
                                            <tr key={c.id}>
                                                <td><Link className='text-decoration-none text-dark' to={'/product/'+c.id}>{c.title}</Link></td>
                                                <td>{c.category}</td>
                                                <td>{c.price}</td>
                                                <td><button className="btn btn-dark btn-sm bold" onClick={()=>dispatch(IncreaseItem(c.id))}>+</button> {c.quantity} <button className="btn btn-dark btn-sm bold" onClick={()=>dispatch(DecreaseItem(c.id))}>-</button></td>
                                                <td><button className="btn btn-danger btn-rounded" onClick={()=>dispatch(RemoveFromCart(c.id))}>Remove</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><button className="btn btn-info" onClick={()=>navigate('/checkout')}>Proceed to checkout</button></td>
                                        <td></td>
                                        <td></td>
                                        <td>Grand Total : {total}</td>
                                        <td><button className="btn btn-warning" onClick={()=>dispatch(ClearCart())}>Clear Cart</button></td>
                                    </tr>
                                </tfoot>
                            </table>
                        ) : (
                            <h1 className="text-center my-4">Empty</h1>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart