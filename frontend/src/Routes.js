import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './body/Navbar'
import Registration from './users/RegistrationSellerClient';
import LoginSellerAndClient from './users/LoginSellerAndClient'
import SuperAdminSignin from './users/SuperAdminLogin'
import Home from './body/Home'
import Cart from './body/Cart'
import ManageSellers from "./body/SuperAdminSection";

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
                <Route path='/superAdmin/ManageSellers' exact component={ManageSellers}/>
            </Switch>
        
        </BrowserRouter>
    )
}

export default Routes