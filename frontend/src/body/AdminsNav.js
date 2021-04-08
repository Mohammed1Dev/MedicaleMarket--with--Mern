import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../helpers/checkToken'
import './bodyStyle.css'

const AdminsMenu = (props) => {

    return(
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
                            <li><a href=""><i className="bx bx-server"></i> Log Out </a></li>
                
                            <span className="badge badge-light">Connect, or Creat One</span>
                            <li><a href=""><i className="bx bx-book-content"></i> Log In </a></li>
                            <li><a href=""><i className="bx bx-server"></i> Log Out </a></li>
            


                        </ul>
                    </nav>
                    <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>

                </div>
            </header>

        </div>
    )
}
export default withRouter(AdminsMenu)
