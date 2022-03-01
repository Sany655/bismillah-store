import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClearCart } from '../../../redux/cart/CartActions';

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [form, setForm] = useState({
        user_id: useSelector(store => store.auth).user._id,
        address: "",
        products: JSON.parse(localStorage.getItem('cart')),
        total: parseInt(localStorage.getItem('total')),
        status:"pending"
    })
    function placeOrder(e) {
        e.preventDefault();
        axios.post('/palce_order', form).then(res => {
            dispatch(ClearCart());
            setForm({
                user_id: null,
                address: "",
                products: [],
                total: 0,
                status:""
            })
            alert('Order Placed');
            navigate('/products');
        }).catch(error => console.log(error.message));
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            <div className="card">
                <div className="card-body">
                    <h4 className='card-title'>Checkout</h4>
                    <form method="post" onSubmit={placeOrder}>
                        <input type="text" className="form-control mb-2" placeholder='Shipping Address' value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
                        <div className="d-grid">
                            <button className='btn btn-outline-primary btn-sm '>Place Order</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout