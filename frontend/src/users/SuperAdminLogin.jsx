import React, { useState } from 'react'
import Container from '../body/container'
import toastr from 'toastr';
import "toastr/build/toastr.css";
import "./formStyle.css"

import { API_URL } from '../restApiUrl/api'


const SuperAdminSignin = (props) => {

    const [superAdmin, setSuperAdmin] = useState({
        email: '',
        hashed_password: ''
    })


    const handleChange = e => {

        setSuperAdmin({...superAdmin, [e.target.id]: e.target.value})

    }

    
    const submitSignin = e => {

        e.preventDefault();

        fetch(`${API_URL}/superAdmin/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(superAdmin)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, ' ... Warning ...!', {
                    positionClass: "toast-bottom-left",
                })
            }
            else {
                toastr.info('Super-Admin is authenticated SuccessFully', 'Welcome To Your Section', {
                    positionClass: "toast-bottom-left",
                })

                localStorage.setItem('jwt_info', JSON.stringify(res))

                props.history.push('/')
            }

            

        })
        .catch(err =>  toastr.error(err, 'Server error !', {
                    positionClass: "toast-bottom-left",
                }))
    }

    const superAdminform = () => (
        <form onSubmit={submitSignin}> 
           
            <div className="form-group">
                <label htmlFor="email" className="text-muted">email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>


            <div className="form-group">
                <label htmlFor="hashed_password" className="text-muted">password</label>
                <input onChange={handleChange} type="password" className="form-control" id="hashed_password"/>
            </div>

            <button className="btn btn-lg btn-block btn-outline-info">Sign In</button>

        
        </form>
    )

    return (
        <div>
        <Container 
           title="Sign In" 
           description="Sign in Like a Super Admin" 
           className="container"
        >
         
        <div className="row">
            <div className="col-md-6 mx-auto super_form">

                { superAdminform() } 
            </div>
        </div> 

        </Container>
    </div>
    )
}

export default SuperAdminSignin
