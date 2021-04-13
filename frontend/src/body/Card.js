import React from 'react'
import { Link } from 'react-router-dom'

import { addToCart } from './../helpers/cartMethods'
import { isAuthenticated } from './../helpers/checkToken'
import { useDispatch } from 'react-redux'

import Image from './Image';
import moment from 'moment'

var addToCartIcon = require('./../icons/addToCart.png');

const Card = ({product, showViewBtn = true}) => {
    
    let dispatch = useDispatch() 

    const showStock = (quantity) => {
     
         return quantity > 0 ? <span className="badge badge-primary">{quantity} In Stock</span> : <span className="badge badge-danger">Out of Stock</span>
      
    }

    return (
        <div>

          <div className="card text-white mb-2 px-2" style={{background: 'linear-gradient(to right, #304352, #d7d2cc)'}}>
              <div className="card-header">
                <h4 className="display-6 text-center">{product.name}</h4> </div>
               <Image item={product} url="product/photo" className="card-img-top"></Image>
                <div className="card-body">
                  <p>{product.description.substring(0, 50)}...</p>
                
                  <div className="well">
                     <h4>{showStock(product.quantity)}</h4> 
                      
                      <span>Added {moment(product.createdAt).fromNow()}</span>

                  </div>

                  <div className="text-center my-3">
                     <span style={{fontSize: '20px'}} className="badge badge-info">{product.price} $</span> 
                     <span className="ml-5 badge-pill badge-dark">{product.category.name}</span> 

                  </div>

                  {showViewBtn && (

                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-warning mr-1">View</button>
                      </Link>
                  
                  )}

                  {(isAuthenticated() && product.quantity > 0) && (
                    <button onClick={() => dispatch(addToCart(product))} className="btn btn-success"><img src={addToCartIcon.default} alt="addToCart"/></button>

                  )}
              </div>
          </div>

        </div>
    )
}

export default Card