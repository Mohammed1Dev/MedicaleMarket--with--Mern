import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { API_URL } from '../restApiUrl/api';
import toastr from 'toastr';
import "toastr/build/toastr.css";
import File from './pdfFile';
import moment from 'moment'


    
const activateIcon = require('./../icons/activate.png')
const deactivateIcon = require('./../icons/deactivate.png')
const deleteIcon = require('./../icons/delete.png')



const SellerCard = ({ seller}) => {

  // const [sellerId, setId] = useState('')

  
  // const handelChange = event => {
  //   setId({...sellerId, [event.target.id]: event.target.value})
  // }
  const history = useHistory()
  const activateSeller = e => {

  
    e.preventDefault();

    if(seller.status === 'deactivated'){


        return fetch(`${API_URL}/superAdmin/activateSeller/${seller._id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'activated'})
        })
          .then(res => console.log(res.json()) )
          .then(res => {
          
                toastr.success(res,' Seller Activated Successfuly', {
                    positionClass: "toast-bottom-left",
                })
                history.go()
        


        }).catch(err => console.error(err))

    }else if(seller.status === 'activated'){


          return fetch(`${API_URL}/superAdmin/activateSeller/${seller._id}`, {
              method: "PATCH",
              headers: {
                  "Accept": "application/json",
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({status: 'deactivated'})
          })
            .then(res => console.log(res.json()) )
            .then(res => {
            
                  toastr.success(res,' Seller Deactivated Successfuly', {
                      positionClass: "toast-bottom-left",
                  })
                  history.go()
          


          }).catch(err => console.error(err))

    }

    
        
        

          
        
  }

    return (
        <div>

          <div className="card text-white mb-2 px-2 sellerCard">
              <div className="card-header">
                <h4 className="display-6 text-center">{`${seller.firstname}  ${seller.lastname}`}</h4> </div>
               <File item={seller} url="sellerFile" className="card-img-top"></File>
                <div className="card-body">
                  <p style={{fontSize: '25px'}} className="text-success">{seller.about.substring(0, 50)}</p>
                
                  <div className="well">
                     {/* <h4>{showStock(seller.quantity)}</h4>  */}
                      
                      
                  </div>

                  <div className="text-center my-3 container">
                     <span  className="row mt-2 badge-pill badge-dark">{seller.email}</span> 
                     <span className="row mt-2 badge-pill badge-dark">Updated From : {moment(seller.updatedAt).fromNow()}</span>
                     <span className="row mt-2 badge-pill badge-dark">Registred : {moment(seller.createdAt).fromNow()}</span>
                
                     <div className="row mt-4">
                            <form className="col-6" onSubmit={activateSeller}>
                              {/* <input type="hidden" value={seller._id} onSubmit={handelChange} id="id"/> */}
                                <button style={{background: 'none', border: 'none'}}><img src={seller.status === 'activated'? activateIcon.default: deactivateIcon.default} alt="activate" /></button>
                            </form>
                            <div className="col-6">
                                <button style={{background: 'none', border: 'none'}}><img src={deleteIcon.default} alt="delete" /></button>
                            </div>
                    </div>


                  </div>

              </div>
          </div>

        </div>
    )
}

export default SellerCard