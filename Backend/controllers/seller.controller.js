const Seller = require('../models/Seller.model');
const { sellerRegisterValidation, sellerLoginValidation,  } = require('../validation/sellerValidation');
require('dotenv').config()
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const lodash = require("lodash")




const sellerRegistration = async (req, res) => {

    let form = new formidable.IncomingForm();

    //req.body
    console.log(req.body);
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Document could nor update"
            })
        }

        let seller = new Seller(fields);

        if(files.document){

            if(files.document.size > Math.pow(20, 6)){
                return res.status(400).json({
                    error: "Document should be less than 64Mo in size !"
                })
            }
            seller.document.data = fs.readFileSync(files.document.path)
            seller.document.contentType = files.document.type
          }

           //Check Joi Error
           //fields
            console.log(fields);
            
            const {error} = sellerRegisterValidation(fields);
            if(error) return res.status(400).send(error.details[0].message);

            //Checking if the user is already in the database
            const emailExist = await Seller.findOne({email: fields.email});
            if(emailExist) return res.status(400).send('Email already exists');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(fields.hashed_password, salt);

            seller.hashed_password = hashedPassword;
            
            await seller.save((err, oneSeller) => {
                if(err) {
                    return res.status(400).send(err)
                }
                console.log(oneSeller);
                res.send(oneSeller)
            })


    })

 
}


const sellerLogin = async (req, res) => {

    
    const {email, hashed_password} = req.body;
    console.log(req.body);
    //Validation
    const {error} = sellerLoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    await Seller.findOne({email}, (err, seller) => {
        if(err || !seller) {
            return res.status(400).json({
                error: "User not found with this email, Please Signup!"
            })
        }
        if(seller.status === 'deactivate'){
            return res.status(400).json({
                error: "we apologize your account is deactivated we need to Verify your account.!!! "
            })
        }else if(seller.status === 'activate'){

            console.log(seller);
            if(!seller.authentificate(hashed_password)){
                return res.status(401).json({
                    error: "Email ans Password dont mutch !"
                })
            }
    
            const token = jwt.sign({_id: seller._id, status: seller.status}, process.env.SECRET_KEY);
            console.log(token);
            // res.cookie("token", token, {expire: new Date() + 902600})

    
            
            // const {_id, fullName, email, status, document} = seller;
            res.header("auth-token", token, {expire: new Date() + 902600}).send({token,seller})
            // res.json({
            //     token, seller: {_id, fullName, email, status, document},message: 'welcome Dear Seller you are authentified Know with activated account'
            // })
        }
  
    })
}

const sellerLogout = (req, res) => {
    res.header("auth-token", null);

    res.json({
        message : "Goodby Seller see you next time..."
    })
}






module.exports = { sellerRegistration, sellerLogin, sellerLogout }

