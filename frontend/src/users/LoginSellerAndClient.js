import React, { useState } from 'react'
import Container from '../body/container'
import toastr from 'toastr';
import "toastr/build/toastr.css";
import "./formStyle.css"

import { API_URL } from '../restApiUrl/api'

const Login = (props) => {

    const [user, setUser] = useState({
        email: '',
        hashed_password: ''
    })

    const [userCase, setCase] = useState('');

    const sellerCase = event => {

        event.target.checked && setCase('isSeller')
     }
 
     const clientCase = event => {
 
         event.target.checked && setCase('isClient')
 
     }

    const handleChange = e => {

        setUser({...user, [e.target.id]: e.target.value})

    }

    
    const submitLogin = e => {

        e.preventDefault();

        if(userCase === 'isClient'){

                fetch(`${API_URL}/client/login`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(res => {
                    if(res.error) {
                        toastr.warning(res.error, 'Please Check form !', {
                            positionClass: "toast-bottom-left",
                        })
                    }
                    else {
                        toastr.info('Client is authenticated SuccessFully', 'Welcome', {
                            positionClass: "toast-bottom-left",
                        })
        
                        localStorage.setItem('jwt_info', JSON.stringify(res))
                        console.log(JSON.stringify(res))
                        props.history.push('/')
                    }
        
                    
        
                })
                .catch(err =>  toastr.error(err, 'Server error !', {
                            positionClass: "toast-bottom-left",
                        }))

        }else if(userCase === 'isSeller'){

                fetch(`${API_URL}/seller/login`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "*/*",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(user)
                }).then(res => {
                    if(res.error) {
                        toastr.warning(res.error, 'Please Check form !', {
                            positionClass: "toast-bottom-left",
                        })
                    }
                    else {
                        toastr.info('Seller is authenticated SuccessFully', 'Welcome', {
                            positionClass: "toast-bottom-left"
                        })
        
                        localStorage.setItem('jwt_info', JSON.stringify(res))
                        console.log(JSON.stringify(res))
                        props.history.push('/')
                    }
        
                    
        
                }).catch(err =>  toastr.error(err, 'Server error !', {
                            positionClass: "toast-bottom-left"
                        }))
        }
      

    }

    const form = () => (
        <form onSubmit={submitLogin}> 

             <div className="form-group row">
                <div className="col-lg-6 text-center">
                        <label htmlFor="seller" className="label">As Seller</label>
                        <input onChange={sellerCase} type="radio" className="form-control" id="seller" name="userCase"/>
                </div>
                <div className="col-lg-6 text-center">
                    <label htmlFor="client" className="label">As Client</label>
                    <input onChange={clientCase} type="radio" className="form-control" id="client" name="userCase"/>           
                </div>
            </div>
           
            <div className="form-group">
                <label htmlFor="email" className="label  mb-3">email</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>


            <div className="form-group">
                <label htmlFor="hashed_password" className="label  mb-3">password</label>
                <input onChange={handleChange} type="password" className="form-control" id="hashed_password"/>
            </div>

            <button className="btn btn-lg btn-block">Connexion</button>

        
        </form>
    )

    return (
        <div>
        <Container 
           title="Login" 
           description="Your Welcome To Medicale MarketPlace" 
           className="container swing-top-fwd mt-5"
        >
         
        <div className="row">
            <div className="col-md-6 mx-auto form">

                { form() } 
            </div>
        </div> 

        </Container>
    </div>
    )
}

export default Login
