import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch()
    const name = useRef()
    const email = useRef()
    const phone = useRef()
    const password = useRef()
    const [error, setError] = useState("")

    function register(e) {
        e.preventDefault();
        dispatch({ type: "COMPANY_LOADING" })
        axios.post('/company/register', {
            name: name.current.value,
            email: email.current.value,
            phone: phone.current.value,
            password: password.current.value
        }).then(res => {
            if (res.data.acknowledged) {
                dispatch({ type: "COMPANY_REGISTER", payload: res.data.company })
            } else {
                setError(error.message)
            }
        }).catch(error => {
            setError(error.message)
        }).finally(() => {
            dispatch({ type: "COMPANY_LOADING" })
        })
    }

    const loading = useSelector(store => store.company).loading;
    const auth = useSelector(store => store.company).auth;

    if (auth) {
        return <Navigate to={'/company'}/>
    }

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
                        <input type="text" placeholder='Full Name' className="form-control mb-2" ref={name} required />
                        <input type="email" placeholder='Email' className="form-control mb-2" ref={email} required />
                        <input type="number" placeholder='Phone Number' className="form-control mb-2" ref={phone} required />
                        <input type="password" placeholder='Password' className="form-control mb-2" ref={password} required />
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