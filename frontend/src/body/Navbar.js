import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from './../helpers/checkToken'

import { useSelector } from 'react-redux'

import toastr from 'toastr';
import "toastr/build/toastr.css";
import {API_URL} from './../restApiUrl/api'
import './bodyStyle.css'


var cartIcon = require('./../icons/iconCart.png');
var logo = require('./../icons/logoMedecine.png');
var sellerManage = require('./../icons/sellerManage.png');
var adminManage = require('./../icons/adminManage.png');
var Parametres = require('./../icons/Parametres.png');
var shopLocation = require('./../icons/shopLocation.png');
var logOut = require('./../icons/logOut.png');



const isActive = (history, path) => {

    if(history.location.pathname === path) {
        return { color: '#000' }
    }
    else{
        return { color: '#fff' }
    }

}


const Menu = (props) => {

    let countItem = useSelector(state => state.cart.count)

    const signOut = () => {

        fetch(`${API_URL}/signout`)
          .then(() => {

            toastr.info('User SignOut', 'Next Time', {
                positionClass: "toast-bottom-left",
            })

            localStorage.removeItem('jwt_info')

            props.history.push('/Login')

          })
          .catch()

    }


    return (
        <div>
            {(() => {
                if (!isAuthenticated() || !isAuthenticated().superAdmin || isAuthenticated().seller || isAuthenticated().client) {
                return (
                    <div>
                        <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{/*background: '-webkit-linear-gradient(to right, #135058, #F1F2B5)',   Chrome 10-25, Safari 5.1-6 */
                                                                        background: 'linear-gradient(to right, #304352, #d7d2cc)'
                                                                        // background: 'linear-gradient(to right, #2bc0e4, #eaecc6)'
                                                                        /* background: 'linear-gradient(to right, #135058, #F1F2B5)' W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                                                                        }}>
     
                    <Link className="navbar-brand" to="/" style={{color: 'linear-gradient(to right, #EAECC6, #7CE7BF)', textShadow: '10px 10px 42px 0px #eaecc6da'}} ><img src={logo.default} alt="Market-Icon"/><span  >Medical-Market</span></Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                   
                  <Fragment> 
                    {/* <li className="nav-item active">
                        <Link style={isActive(props.history, '/')} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active">
                        <Link style={isActive(props.history, '/shop')} className="nav-link" to="/shop">Shop </Link>
                    </li> */}
                    {isAuthenticated().seller && isAuthenticated().seller.status? 
                        <li className="nav-item active">
                        <Link 
                            style={isActive(props.history, '/dashboard')} 
                            className="nav-link" 
                            to={ '/admin/dashboard'}
                            >
                                SellerSection
                        </Link>
                        </li>
                    :
                     <li className="nav-item active">
                        <Link 
                            style={isActive(props.history, '/dashboard')} 
                            className="nav-link" 
                            to={ '/admin/dashboard'}
                            >
                                Shop
                        </Link>
                    </li>
                    }
                   
                    
                </Fragment> 
               
                </ul>
                <ul className="navbar-nav ml-auto">

                    { !isAuthenticated() && (
                    
                        <Fragment>
                            
                            <li className="nav-item">
                                <Link style={isActive(props.history, '/Registration')} className="nav-link" to="/Registration">Registration</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link style={isActive(props.history, '/Login')} className="nav-link" to="/Login">Connexion</Link>
                            </li>
                        </Fragment>
                    ) }

                            { isAuthenticated() && ( 
                                <li className="nav-item">
                                    <Link style={isActive(props.history, '/cart')} className="nav-link" to="/cart">
                                        <img src={cartIcon.default} alt="cart"/><span className="badge badge-warning"> { countItem }</span>
                                    </Link>
                                </li> )}
                    { isAuthenticated() && (
                        <Fragment>
                            
                            <li className="nav-item">
                                <span className="nav-link text-dark" style={{ cursor: 'pointer' }} onClick={signOut}>SignOut</span>
                            </li>
                        </Fragment>
                    ) }
                </ul>
                
            </div>
            </nav>
                    </div>
                )
                } else if (isAuthenticated() || isAuthenticated().superAdmin || isAuthenticated().admin) {
                return (
                    <div>
                        <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>

                        <header id="header">
                            <div className="d-flex flex-column">

                                <div className="profile">
                                    <img style={{width: '30%'}} src={logo.default} alt="" className="img-fluid rounded-circle" />
                                    <h1 className="text-light"><a href="index.html"></a></h1>
                                    <div className="social-links mt-3 text-center">
                                     
                                    </div>
                                </div>

                                <nav class="nav-menu">
                                    <ul>

                                        <li className="active">
                                        
                                            <Link 
                                            style={isActive(props.history, '/superAdmin/ManageSellers')} 
                                            className="nav-link" 
                                            to={ '/superAdmin/ManageSellers'}
                                            >
                                               <img src={sellerManage.default} alt="sellerManage"/> Sellers Management
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                
                                                className="nav-link" 
                                                to={ '/superAdmin/ManageSellers'}
                                                >
                                                <img src={adminManage.default} alt="sellerManage"/> Admins Management
                                            </Link>
                                        </li>
                                
                                        <li>
                                        <Link 
                                                
                                                className="nav-link" 
                                                to={ '/superAdmin/ManageSellers'}
                                                >
                                                <img src={Parametres.default} alt="sellerManage"/> Parametres
                                            </Link>
                                        </li>
                                        <li>
                                        <Link 
                                                
                                                className="nav-link" 
                                                to={ '/superAdmin/ManageSellers'}
                                                >
                                                <img src={shopLocation.default} alt="sellerManage"/> See Interctivity
                                            </Link>
                                        </li>
                                        { isAuthenticated() && (
                                            <Fragment>
                                                <li className="nav-item">
                                                    <span className="nav-link text-dark" style={{ cursor: 'pointer' }} onClick={signOut}><img src={logOut.default} alt="sellerManage"/>SignOut</span>
                                                    
                                                </li>
                                            </Fragment>
                                        ) }
                            
                                        



                                    </ul>
                                </nav>
                                <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>

                            </div>
                        </header>
                    </div>
                )
                } 
            })()}


        </div>
    )
}

export default withRouter(Menu)