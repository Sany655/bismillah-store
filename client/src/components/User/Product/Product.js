import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AddToCart } from '../../../redux/cart/CartActions';
import { getProduct } from '../../../redux/products/productActions';

function Product() {
    const params = useParams();
    const dispatch = useDispatch();
    const product = useSelector(store => store.products).singleProduct;
    
    useEffect(()=>{
        dispatch(getProduct(parseInt(params.id)));
    },[])
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <img src={product.image} height="300px" width="100%" />
            </div>
            <div className="col-md-6 my-5">
                <h4>{product.title}</h4>
                <p>Category : {product.category}</p>
                <p>Price : {product.price}</p>
                <p>{product.description}</p>
                <p>Ratings : {product.rating?.rate}/5</p>
                <button className="btn btn-primary" onClick={()=>dispatch(AddToCart(product))}>Add To Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Product