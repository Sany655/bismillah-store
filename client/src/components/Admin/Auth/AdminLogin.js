import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminLogin() {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    
    const admin = useSelector(store => store.admin).admin
    const error = useSelector(store => store.admin).error;
    const loading = useSelector(store => store.admin).loading;
    
    if (admin) {
        return <Navigate to={'admin'}/>
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="col-md-4">
                    <form method="post" onSubmit={(e)=>{
                        e.preventDefault()
                        dispatch({type:"LOGIN",payload:form});
                    }}>
                        <h3 className="text-center my-3">Login</h3>
                        {
                            error && <div className="alert alert-danger">{error}</div>
                        }
                        <input type="text" placeholder='Username' className="form-control mb-2" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
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

export default AdminLogin