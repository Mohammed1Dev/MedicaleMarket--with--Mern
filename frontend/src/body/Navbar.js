import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from './../helpers/checkToken'

import { useSelector } from 'react-redux'

import toastr from 'toastr';
import "toastr/build/toastr.css";
import {API_URL} from './../restApiUrl/api'
import './bodyStyle.css'


var cartIcon = require('./../icons/iconCart.png');



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
                if (!isAuthenticated() || isAuthenticated().seller || isAuthenticated().client) {
                return (
                    <div>
                        <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{/*background: '-webkit-linear-gradient(to right, #135058, #F1F2B5)',   Chrome 10-25, Safari 5.1-6 */
                                                                        background: 'linear-gradient(to right, #134e5e, #71b280)'
                                                                        // background: 'linear-gradient(to right, #2bc0e4, #eaecc6)'
                                                                        /* background: 'linear-gradient(to right, #135058, #F1F2B5)' W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                                                                        }}>
     
                    <Link className="navbar-brand" to="/"><img src="https://img.icons8.com/nolan/64/hospital.png" alt="Market-Icon"/><span className='text-white'>Medical-Market</span></Link>
            
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
                } else if (isAuthenticated().superAdmin || isAuthenticated().admin) {
                return (
                    <div>
                        <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>

                        <header id="header">
                            <div className="d-flex flex-column">

                                <div className="profile">
                                    <img src="assets/img/" alt="" className="img-fluid rounded-circle" />
                                    <h1 className="text-light"><a href="index.html"></a></h1>
                                    <div className="social-links mt-3 text-center">
                                        <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                                        <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                                        <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                                        <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                                        <a href="#" className="linkeclassNamedin"><i className="bx bxl-linkedin"></i></a>
                                    </div>
                                </div>

                                <nav class="nav-menu">
                                    <ul>

                                        <li className="active"><a href="Home.php"><i className="bx bx-home"></i> <span>Home</span></a></li>
                                        <li><a href=""><i className="bx bx-user"></i> <span>Lists</span></a></li>
                                        <li><a href=""><i className="bx bx-server"></i>Our Facts</a></li>
                                        <li><a href=""><i className="bx bx-envelope"></i> Your Profile -</a></li>
                                        <li><a href=""><i className="bx bx-book-content"></i> Log In </a></li>
                                        { isAuthenticated() && (
                                            <Fragment>
                                                <li className="nav-item">
                                                    <span className="nav-link text-dark" style={{ cursor: 'pointer' }} onClick={signOut}>SignOut</span>
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