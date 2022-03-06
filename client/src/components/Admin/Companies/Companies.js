import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function Companies() {
    const dispatch = useDispatch()
    const [getCompanies, setGetCompanies] = useState(false)
    useEffect(() => {
        dispatch({ type: "ADMIN_LOADING" })
        axios.get("/admin/companies").then(res => {
            console.log(res.data);
            dispatch({ type: "GET_COMPANIES", payload: res.data });
        }).catch(error => {
            dispatch({ type: "ADMIN_ERROR", payload: error.message })
        }).finally(() => {
            dispatch({ type: "ADMIN_LOADING" })
            setGetCompanies(false)
        })
    }, [getCompanies])
    const companies = useSelector(store => store.admin).companies
    const loading = useSelector(store => store.admin).loading
    const deactiveCompany = (_id) => {
        axios.post("admin/company/deactive",{_id:_id}).then((res)=>{
            setGetCompanies(true)
        })
    }
    const activeCompany = (_id) => {
        axios.post("admin/company/active",{_id:_id}).then((res)=>{
            setGetCompanies(true)
        })
    }
    return (
        <div className="container">
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    companies.length > 0 ? (
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Company Email</th>
                                    <th>Company Phone</th>
                                    <th>Company Location</th>
                                    <th>Company Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company, index) => (
                                    <tr key={index}>
                                        <td>{company.name}</td>
                                        <td>{company.email}</td>
                                        <td>{company.phone}</td>
                                        <td>{company.location}</td>
                                        <td>
                                            {
                                                company.status ? <button className="btn btn-danger" onClick={() => deactiveCompany(company._id)}>Deactive</button> : <button className="btn btn-info" onClick={() => activeCompany(company._id)}>Active</button>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h1 className="text-center">No Company Registered Yet</h1>
                    )
                )
            }
        </div>
    )
}

export default Companies