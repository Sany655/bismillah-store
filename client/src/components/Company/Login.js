import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const loading = useSelector(store => store.company).loading;
    const auth = useSelector(store => store.company).auth;

    async function login(e) {
        e.preventDefault();
        dispatch({type:"COMPANY_LOADING"});
        axios.post('/company/login', form).then(res => {
            if (res.data.acknowledged) {
                dispatch({type:"COMPANY_LOGIN",payload:res.data.company})
            } else {
                setError(res.data)
            }
        }).catch(error => {
            setError(error.message)
        }).finally(() => {
            dispatch({type:"COMPANY_LOADING"});
        })
    }

    if (auth) {
        return <Navigate to={'/company'}/>
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="col-md-4">
                    <form method="post" onSubmit={login}>
                        <h3 className="text-center my-3">Login</h3>
                        {
                            error && <div className="alert alert-danger">{error}</div>
                        }
                        <input type="email" placeholder='Email' className="form-control mb-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        <input type="password" placeholder='Password' className="form-control mb-2" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                        <div className="d-grid">
                            {loading ? <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Submitting...
                            </button> : <button className="btn btn-primary">Submit</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login