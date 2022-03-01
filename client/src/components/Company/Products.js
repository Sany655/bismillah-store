import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Products() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.products).product
    const loading = useSelector(store => store.products).loading
    const error = useSelector(store => store.products).error

    const name = useRef()
    const quantity = useRef()
    const price = useRef()
    const description = useRef()

    function addProduct(e) {
        e.preventDefault();

        axios.post('/company/add-product', {
            name, quantity, price, description
        }).then(res => {

        }).catch(err => {
            dispatch({type:"PRODUCTS_ERROR",payload:err.message})
        })
    }

    useEffect(() => {
        dispatch({ type: "LOADING_PRODUCTS" })
        axios.get('/company/products').then(res => {
            dispatch({ type: "GET_PRODUCTS", payload: res.data })
        }).catch(err => {
            dispatch({type:"PRODUCTS_ERROR",payload:err.message})
        }).finally(() => {
            dispatch({ type: "LOADING_PRODUCTS" })
        })
    }, [])

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Product</button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-fullscreen-lg-down">
                                <form className="modal-content" method='post' onSubmit={addProduct}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Product</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input ref={name} type="text" className="form-control mb-4" placeholder='Product Name' />
                                        <input ref={quantity} type="text" className="form-control mb-4" placeholder='Quantity' />
                                        <input ref={price} type="text" className="form-control mb-4" placeholder='Price' />
                                        <textarea ref={description} className="form-control" placeholder='Description'></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            products.length > 0 ? (
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>image</th>
                                            <th>name</th>
                                            <th>quantity</th>
                                            <th>price</th>
                                            <th>stock</th>
                                            <th>status</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <h1 className="text-center">No Product Added Yet</h1>
                            )
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Products