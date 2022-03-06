import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Products() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.products).product
    const loading = useSelector(store => store.products).loading
    const error = useSelector(store => store.products).error
    const imgBaseUrl = useSelector(store => store.products).imageBaseUrl
    const company = useSelector(store => store.company).company
    const addProductModalCloseRef = useRef()

    const [getData, setGetData] = useState(true)

    async function addProduct(e) {
        dispatch({ type: "LOADING_PRODUCTS" })
        e.preventDefault();
        const fd = new FormData();
        fd.append("company_id", company._id);
        fd.append("name", e.target.name.value);
        fd.append("category", e.target.category.value);
        fd.append("price", e.target.price.value);
        fd.append("quantity", e.target.quantity.value);
        fd.append("measerment_unit", e.target.measerment_unit.value);
        fd.append("sold", 0);
        fd.append("description", e.target.description.value);
        fd.append("created_at", new Date());
        fd.append("updated_at", new Date());
        fd.append("selling", true);
        fd.append("rating", JSON.stringify([{rate:0,review:""}]));
        fd.append("image", e.target.image.files[0]);
        axios.post('/company/add-product', fd).then(res => {
            if (res.data.acknowledged) {
                addProductModalCloseRef.current.click()
                setGetData(true)
            } else {
                dispatch({ type: "PRODUCTS_ERROR", payload: res.data })
            }
        }).catch(err => {
            dispatch({ type: "PRODUCTS_ERROR", payload: err.message })
        }).finally(()=>{
            dispatch({ type: "LOADING_PRODUCTS" })
        })
    }

    useEffect(() => {
        dispatch({ type: "LOADING_PRODUCTS" })
        dispatch({ type: "PRODUCTS_ERROR", payload: "" })
        axios.get('/company/products/'+company._id).then(res => {
            dispatch({ type: "GET_PRODUCTS", payload: res.data })
        }).catch(err => {
            dispatch({ type: "PRODUCTS_ERROR", payload: err.message })
        }).finally(() => {
            dispatch({ type: "LOADING_PRODUCTS" })
            setGetData(false)
        })
    }, [getData])

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
                        <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-fullscreen-lg-down">
                                <form className="modal-content" method='post' onSubmit={addProduct} encType="multipart/form-data">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addProductModalLabel">Add Product</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {
                                            error && error.length > 0 && <div className="alert alert-danger mb-4">{error}</div>
                                        }
                                        <input required autoComplete='off' name={"image"} type="file" accept="image/png, image/gif, image/jpeg" className="mb-4" />
                                        <input required autoComplete='off' name={"name"} type="text" className="form-control mb-4" placeholder='Product Name' />
                                        <input required autoComplete='off' name={"category"} type="text" className="form-control mb-4" placeholder='Product category' />
                                        <input required autoComplete='off' name={"quantity"} type="number" className="form-control mb-4" placeholder='Product Quantity' />
                                        <input required autoComplete='off' name={"measerment_unit"} type="text" className="form-control mb-4" placeholder='Product quantity measerment unit' />
                                        <input required autoComplete='off' name={"price"} type="text" className="form-control mb-4" placeholder='Price' />
                                        <textarea required name={"description"} className="form-control" placeholder='Description'></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal" ref={addProductModalCloseRef}>Close</button>
                                        {
                                            loading ? <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Submitting...
                                        </button> : <button type="submit" className="btn btn-primary">Save</button>
                                        }
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
                                            <th>selling</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((prod, index) => (
                                                <tr key={index}>
                                                    <td><img src={imgBaseUrl+prod.image} width="50px" alt="" /></td>
                                                    <td>{prod.name}</td>
                                                    <td>{prod.quantity}</td>
                                                    <td>{prod.price}</td>
                                                    <td>{prod.selling ? (
                                                        <div className="btn btn-danger">Pause Sell</div>
                                                    ) : (
                                                        <div className="btn btn-info">Resume Sell</div>
                                                    )}</td>
                                                    <td></td>
                                                </tr>
                                            ))
                                        }
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