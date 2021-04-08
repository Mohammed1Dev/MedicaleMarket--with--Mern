import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { isAuthenticated } from './helpers/checkToken'
import Menu from './body/Navbar'
import Registration from './users/RegistrationSellerClient';
import LoginSellerAndClient from './users/LoginSellerAndClient'
import SuperAdminSignin from './users/SuperAdminLogin'
import Home from './body/Home'
import Cart from './body/Cart'

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
 
            
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Registration' exact component={Registration} />
                <Route path='/Login' exact component={LoginSellerAndClient} />
                <Route path='/cart' exact component={Cart} />

                <Route path='/superAdmin/SignIn' exact component={SuperAdminSignin}/>
            </Switch>
        
        </BrowserRouter>
    )
}

export default Routes