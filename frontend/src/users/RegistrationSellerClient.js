import React, { useState } from 'react'
import Container from '../body/container'
import toastr from 'toastr';
import "toastr/build/toastr.css";
import "./formStyle.css"

import { API_URL } from '../restApiUrl/api'


const Registration = (props) => {

    const [client, setClient] = useState({
        firstname: '',
        lastname: '',
        email: '',
        hashed_password: '',
        repeat_password: '',
        about: ''
    })
    const [seller, setSeller] = useState({
        firstname: '',
        lastname: '',
        experience: '',
        email: '',
        hashed_password: '',
        repeat_password: '',
        about: '',
        document: ''
    })
    const [formData, setFormData] = useState(new FormData()); 

    const [userCase, setCase] = useState('');

    const handleChange = event => {

        const value = event.target.id === 'document' ? event.target.files[0] : event.target.value;
        if(userCase === 'isClient'){
            setClient({...client, [event.target.id]: value})
        }else if(userCase === 'isSeller'){
            formData.set(event.target.id, value)
            setSeller({...seller, [event.target.id]: value})
        }
        


    }

    const sellerCase = event => {

       event.target.checked && setCase('isSeller')
    }

    const clientCase = event => {

        event.target.checked && setCase('isClient')

    }

    const submitRegistration = e => {

        e.preventDefault();

    if(userCase === 'isClient'){

            fetch(`${API_URL}/client/registration`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(client)

            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    toastr.warning(res.error, 'Please Check form !', {
                        positionClass: "toast-bottom-left",
                    })
                }
                else {
                    toastr.success('Client is created SuccessFully', 'New Accout', {
                        positionClass: "toast-bottom-left",
                    })

                    props.history.push('/Login')
                }

                

            })
            .catch(err =>  toastr.error(err, 'Server error !', {
                        positionClass: "toast-bottom-left",
                    }))

            

        }else if(userCase === 'isSeller'){

            fetch(`${API_URL}/seller/registration`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                   
                },
                body: formData
                // JSON.stringify(seller)
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    toastr.warning(res.error, 'Please Check form !', {
                        positionClass: "toast-bottom-left",
                    })
                }
                else {
                    toastr.success('Seller is created SuccessFully', 'New Accout', {
                        positionClass: "toast-bottom-left",
                    })
                    setFormData(new FormData())
                    props.history.push('/Login')
                    
                }

                

            })
            .catch(err =>  toastr.error(err, 'Server error !', {
                        positionClass: "toast-bottom-left",
                    }))
    
    }
     
    }

    const form = () => (
        <form onSubmit={submitRegistration}> 
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
                <label htmlFor="firstname" className="label mb-3">FirstName :</label>
                <input onChange={handleChange} type="text" className="form-control" id="firstname" />
            </div>
            <div className="form-group">
                <label htmlFor="lastname" className="label mb-3">LastName :</label>
                <input onChange={handleChange} type="text" className="form-control" id="lastname" />
            </div>
            {userCase === 'isSeller' && 
           
                <div className="form-group">
                    <label htmlFor="experience" className="label mb-3">Your Experience :</label>
                    <input onChange={handleChange} type="number" className="form-control" id="experience"/>
                </div>
            }
            
            <div className="form-group">
                <label htmlFor="email" className="label mb-3">E-mail :</label>
                <input onChange={handleChange} type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
                <label htmlFor="about" className="label mb-3">About :</label>
                <input onChange={handleChange} type="textarea" className="form-control" id="about"/>
            </div>

            <div className="form-group">
                <label htmlFor="hashed_password" className="label mb-3">password :</label>
                <input onChange={handleChange} type="password" className="form-control" id="hashed_password"/>
            </div>
            <div className="form-group">
                <label htmlFor="repeat_password" className="label mb-3">repeat password :</label>
                <input onChange={handleChange} type="password" className="form-control" id="repeat_password"/>
            </div>
            {userCase === 'isSeller' &&

                 <div className="form-group">
                    <label htmlFor="document" className="label mb-3">Upload your justification Document:</label>
                    <input onChange={handleChange} type="file" className="form-control" id="document"/>
                </div>
            }
           


            <button className="btn btn-lg btn-block">Sign Up</button>

        </form>
    )

    return (
        <div>
        <Container 
           title="Registration" 
           description="Your Welcome To Medicale MarketPlace" 
           className="container"
        >
         
        <div className="row">
            <div className="col-md-6 mx-auto form swing-top-fwd">

                { form() } 
            </div>
        </div> 

        </Container>
    </div>
    )
}

export default Registration
