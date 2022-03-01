import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AuthError, AuthLoading, LoginAction } from '../../../redux/auth/AuthActions';

function Register() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    function register(e) {
        dispatch(AuthLoading())
        e.preventDefault();
        axios.post('/register', form).then(res => {
            if (res.data.acknowledged) {
                dispatch(LoginAction(res.data.user))
                dispatch(AuthError(''))
            } else {
                dispatch(AuthError(res.data))
            }
        }).catch(error => {
            dispatch(AuthError(error.message))
        }).finally(() => {
            dispatch(AuthLoading())
        })
    }

    const loading = useSelector(store => store.auth).loading;
    const error = useSelector(store => store.auth).error;

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="col-md-4">
                    <form method="post" onSubmit={register}>
                        <h3 className='text-center my-4'>Registration</h3>
                        {
                            error && <div className="alert alert-danger">{typeof error === "object" ? (
                                JSON.stringify(error, null, 2)
                            ) : error}</div>
                        }
                        <input type="text" placeholder='Full Name' className="form-control mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                        <input type="email" placeholder='Email' className="form-control mb-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        <input type="number" placeholder='Phone Number' className="form-control mb-2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                        <input type="password" placeholder='Password' className="form-control mb-2" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                        <div className="d-grid">
                            {
                                loading ? (
                                    <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Submitting...
                                    </button>
                                ) : (
                                    <button className="btn btn-primary">Submit</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register