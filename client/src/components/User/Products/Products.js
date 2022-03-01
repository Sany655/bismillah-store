import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import loader from "../../../assets/svs/loader.svg";
import { AddToCart } from '../../../redux/cart/CartActions';
import { Link } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products).product
  const loading = useSelector(state => state.products).loading
  const error = useSelector(state => state.products).error
  
  return (
    <div className="container">
      {
        loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            <img src={loader} alt="Loading..." width={"100px"} />
          </div>
        ) : (
          error ? <h1 className="alert alert-danger my-5">{error}</h1> : (
            <div className="row">
              {products.map(product => (
                <div className="col-md-3 my-3" key={product.id}>
                  <div className="card">
                    <img src={product.image} alt="" className="card-img-top" style={{height:"150px",width:"100%"}} />
                    <div className="card-body">
                    <h5 className="card-title"><Link className='text-decoration-none text-dark' to={'/product/'+product.id}>{product.title}</Link></h5>
                      <ul className='navbar-nav'>
                        <li>Category : {product.category}</li>
                        <li>Rating : {product.rating.rate}</li>
                        <li>Price : {product.price}Tk</li>
                      </ul>
                      <button className="btn btn-primary" onClick={() => dispatch(AddToCart(product))}>cart <b>+</b></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )
      }
    </div>
  )
}

export default Products