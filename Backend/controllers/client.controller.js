const Client = require('../models/Client.model');
const { clientRegisterValidation, clientLoginValidation,  } = require('../validation/clientValidation');
require('dotenv').config()
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





const clientRegistration = async (req, res) => {




           //Check Joi Error
           let client = new Client(req.body);
            console.log(client);

            const {error} = clientRegisterValidation(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            //Checking if the user is already in the database
            const emailExist = await Client.findOne({email: client.email});
            if(emailExist) return res.status(400).send('Email Client already exists');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(client.hashed_password, salt);
            
            client.hashed_password = hashedPassword;
            
             await client.save((err, oneClient) => {
                if(err) {
                    return res.status(400).send(err)
                }
                res.send(oneClient)
            })

              //save new user
                // try {
                //     const savedClient = await client.save();
                //     res.send(savedClient);
                // } catch (err) {
                //     res.send(err);
                // }
                // _.pick(savedClient,['_id','firstname','lastname','email'])

 
}


const clientLogin = async (req, res) => {

    
    const {email, hashed_password} = req.body;
    console.log(req.body);
    //Validation
    const {error} = clientLoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    await Client.findOne({email}, (err, client) => {
        if(err || !client) {
            return res.status(400).json({
                error: "client not found with this email, Please Signup!"
            })
        }

            console.log(client);
            if(!client.authentificate(hashed_password)){
                return res.status(401).json({
                    error: "Email ans Password dont mutch !"
                })
            }
    
            const token = jwt.sign({client}, process.env.SECRET_KEY);
            console.log(token);
            // res.cookie("token", token, {expire: new Date() + 902600})

            // const {_id, fullName, email, status, document} = client;
            res.header("auth-token", token,{expire: new Date() + 902600}).send({token})
            // res.json({
            //     token, seller: {_id, fullName, email, status, document},message: 'welcome Dear Seller you are authentified Know with activated account'
            // })
        
  
    })
}

const clientLogout = (req, res) => {
    res.header("auth-token", null);

    res.json({
        message : "Goodby Client see you next time..."
    })
}






module.exports = { clientRegistration, clientLogin, clientLogout }

