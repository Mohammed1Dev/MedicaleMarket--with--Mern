const Admin = require('../models/Admin.model');
const { adminLoginValidation,  } = require('../validation/clientValidation');
require('dotenv').config()
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const adminLogin = async (req, res) => {

    
    const {email, hashed_password} = req.body;
    console.log(req.body);
    //Validation
    const {error} = adminLoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    await Admin.findOne({email}, (err, admin) => {
        if(err || !admin) {
            return res.status(400).json({
                error: "client not found with this email, Please Signup!"
            })
        }

            console.log(admin);
            if(!admin.authentificate(hashed_password)){
                return res.status(401).json({
                    error: "Email ans Password dont mutch !"
                })
            }
    
            const token = jwt.sign(admin, process.env.SECRET_KEY);
            console.log(token);
            // res.cookie("token", token, {expire: new Date() + 902600})

            // const {_id, fullName, email, status, document} = client;
            res.header("auth-token", token).send({token})
            // res.json({
            //     token, seller: {_id, fullName, email, status, document},message: 'welcome Dear Seller you are authentified Know with activated account'
            // })
        
  
    })
}

const adminLogout = (req, res) => {
    res.header("auth-token", null);

    res.json({
        message : "Goodby Admin see you next time..."
    })
}






module.exports = { adminLogin, adminLogout }