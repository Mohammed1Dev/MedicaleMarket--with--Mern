const superAdmin = require('../models/superAdmin.model')
const Seller = require('../models/Seller.model');
const Admin = require('../models/Admin.model');
const { superAdminRegisterValidation, superAdminLoginValidation  } = require('../validation/superAdminValidation');
const { validateAdmin } = require('../validation/adminValidation')
require('dotenv').config()
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





const superAdminRegistration = async (req, res) => {

           //Check Joi Error
            console.log(req.body);
            
            const {error} = superAdminRegisterValidation(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            let superadmin = new superAdmin(req.body);
            //Checking if the user is already in the database
            const emailExist = await superAdmin.findOne({email: req.body.email});
            if(emailExist) return res.status(400).send('Email already exists');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.hashed_password, salt);
            superadmin.hashed_password = hashedPassword;

            await superadmin.save((err, spradmin) => {
                if(err) {
                    return res.status(400).send(err)
                }
                res.send(spradmin)
            })

 
}


const superAdminLogin = async (req, res) => {

    
    const {email, hashed_password} = req.body;
    console.log(req.body);
    //Validation
    const {error} = superAdminLoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    await superAdmin.findOne({email}, (err, spradmin) => {
        if(err || !spradmin) {
            return res.status(400).json({
                error: "Super-Admin not found with this email, Please contact our Company to create you anccount if you really work with us !!!"
            })
        }
        console.log(spradmin);
        if(!spradmin.authentificate(hashed_password)){
            return res.status(401).json({
                error: "Email ans Password dont mutch !"
            })
        }

        const token = jwt.sign({_id: spradmin._id, fullName: spradmin.fullName}, process.env.SECRET_KEY);
        console.log(token);
        // res.cookie("token", token, {expire: new Date() + 30000})

        
        const {_id, fullName, email} = spradmin;
        res.header("auth-token", token, {expire: new Date() + 902600}).send({token, superAdmin: {_id, fullName, email}, message: 'welcome Dear Super-Admin you have a lot of work awaiting for you Let\'s Activate OR Ban a Seller account'})
        // res.json({
        //     token, superAdmin: {_id, fullName, email}, message: 'welcome Dear Super-Admin you have a lot of work awaiting for you Let\'s Activate OR Ban a Seller account'
        // })
    })
}

const superAdminLogout = (req, res) => {
    res.clearCookie("token")

    res.json({
        message : "Goodby SuperAdmin good work & see you next time..."
    })
}


//-----------------Super Admin Work Section-----------------//

//List Of all Existing Sellers
const allSellers = (req, res) => {

    Seller.find()
    .then(sellers => {
        console.log(sellers);
          res.status(200).json(sellers);
        }).catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
} 

//activate Sellers accounts
const sellerConfirmation = (req, res) => {
    // Find seller By ID and update it
    Seller.updateOne({ _id: req.params.id },{ status: req.body.status })
                .then(() => res.status(201).json("Seller activated successfully"))
                .catch((err) => res.status(400).json("Error :" + err));
};
//Bann Seller account
const bannSeller = (req, res) => {
    const {id} = req.params;
    Seller.findOneAndDelete({_id: id})
        .then(seller => {
            if(!seller) {
              res.status(404).json({
                message: "seller dosen't exist with this id = " + id,
                error: "404",
              });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
              message: "Error!!! Can not Bann a seller with id = " + id,
              error: err.message
            });
        });
  };


//Show The List of Admins
const adminsList = (req, res) => {
    Admin.find()
    .then(admins => { res.status(200).json(admins) })
    .catch(error => {
          console.log(error);
          res.status(500).json({ message: "Error!", error: error });
        });
  };

//Show of One Admin
const getOneAdmin = (req, res) => {
    Admin.findById(req.params.id)
        .then(admin => { res.status(200).json(admin) })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Admin with id " + req.params.id,
                error: err
            });
        });
  };

//Add Admin
const createAdmin = async (req, res) => {
  
        //Check Joi Error
        console.log(req.body);
                
        const {error} = validateAdmin(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let admin = new Admin(req.body);
        //Checking if the user is already in the database
        const emailExist = await Admin.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('admin already exist with this email');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.hashed_password, salt);
        admin.hashed_password = hashedPassword;
        await admin.save()
             .then(() => res.json("Creation Admin Successfuly !!! we have new Admin"))
             .catch((err) => res.status(400).json("Error :" + err));

  };

//update Admins
const updateAdmin = async (req, res) => {
 

        // Validate with Joi
        const {error} = validateAdmin(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        let admin = new Admin(req.body)

        const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.hashed_password, salt);
            admin.hashed_password = hashedPassword;

        Admin.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
                .then(adminn => {
                    if(!adminn) {
                
                    return res.status(404).send({
                        message: "Admin not found with id " + req.params._id
                    });
                
                    }
                    res.status(201).json("Admin is update successfully")})
                .catch(err => {
                    if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Admin not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating Admin with id " + req.params.id
                    });

                    })

  }

//Delete Admin
const deleteAdmin = (req, res) => {
    const {id} = req.params;
    Admin.findOneAndDelete({_id: id}).then(admin => {

                if(!admin) {
                    res.status(404).json({
                        message: "Does Not exist a admin with id = " + id,
                        error: "404",
                    });
                }
                res.status(200).json({}) })
                .catch(err => {
                    return res.status(500).send({
                    message: "Error -> Can NOT delete a categorie with id = " + id,
                    error: err.message
                });
        });
  };

module.exports = { 
                    superAdminRegistration, 
                    superAdminLogin, 
                    superAdminLogout, 
                    allSellers, 
                    sellerConfirmation,
                    bannSeller,
                    adminsList,
                    getOneAdmin,
                    createAdmin,
                    updateAdmin,
                    deleteAdmin

                }