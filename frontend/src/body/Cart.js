import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { incProductCount, decProductCount, removeProduct } from './../helpers/cartMethods'

import Container from './container'
import Image from './Image'
// import Checkout from './Checkout'

function Cart() {

    let productsInCart = useSelector(state => state.cart.products)
    let dispatch = useDispatch()
  
    return (
        <div>
                <Container
                    title="Cart" 
                    description="List of Products in Cart" 
                    className="container-fluid"
                >
                   <div className="row">
                       <div className="col-md-9">

                            <h3>Your Cart</h3>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {productsInCart.map((product, index) => (
                                        <tr key={product._id}>
                                            <td width="80px">
                                                <Image item={product} url="product/photo" className="card-img-top"></Image>
                                            </td>
                                            <td>
                                                <h5>{product.name}</h5>
                                                <p className="well">{product.description.substring(0, 100)}</p>
                                            </td>
                                            <td>
                                                    <div className="input-group">
                                                         <h4><span className="span span-success">{product.count}</span></h4>
                                                        <div className="input-group-prepend">
                                                           <button onClick={() => dispatch(incProductCount(product))} className="btn ml-2 btn-raised btn-sm btn-info">
                                                           <i className="material-icons">add</i>
                                                           </button>

                                                         { product.count > 1 && (

                                                           <button onClick={() => dispatch(decProductCount(product))} className="btn btn-raised btn-sm btn-secondary">
                                                           <i className="material-icons">remove</i>
                                                           </button>

                                                         ) }  
                                                        </div>
                                                       
                                                    </div>

                                            </td>
                                            <td>{product.price} $ </td>
                                            <td>{product.price * product.count} $ </td>
                                            <td className="text-right">
                                                <button onClick={() => dispatch(removeProduct(product._id))} className="btn btn-sm btn-dark">
                                                  <i className="material-icons">delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                   ))}
                                </tbody>
                            </table>
                       </div>
                       <div className="col-md-3">
                       {/* <Checkout products={productsInCart}/> */}
                       </div>
                   </div>

                </Container>
        </div>
    )
}

export default Cart
