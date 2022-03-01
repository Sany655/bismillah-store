import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../../../redux/orders/OrderActions';
import Error from '../Common/Error';

function Orders() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "LOADING" });
        axios.get('/my_orders').then((res) => {
            dispatch({ type: "ERROR", error: "" });
            dispatch(getMyOrders(res.data));
        }).catch(error => {
            dispatch({ type: "ERROR", error: error.message });
        }).finally(() => {
            dispatch({ type: "LOADING" });
        })
    }, [])
    const orders = useSelector(store => store.order).orders
    const loading = useSelector(store => store.order).loading
    const error = useSelector(store => store.order).error
    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body">
                    {error && <Error error={error} />}
                    {
                        loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                                <div className="spinner-border" style={{ width: "5rem", height: "5rem" }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            orders.length > 0 ? (
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Order No</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Order date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    {
                                        orders.map((order, i) => (
                                            <React.Fragment key={i}>
                                                <tbody>
                                                    {
                                                        order.products.map((product, j) => (
                                                            <tr key={j}>
                                                                <td></td>
                                                                <td>{product.title}</td>
                                                                <td>{product.category}</td>
                                                                <td>{product.quantity}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr>
                                                        <th>{order._id}</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{order.created_at}</th>
                                                        <th>{order.total}</th>
                                                        <th><button className="btn btn-primary">{order.status}</button></th>
                                                    </tr>
                                                </tbody>
                                            </React.Fragment>
                                        ))
                                    }
                                </table>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                                    <h1>Nothing Ordered Yet</h1>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders