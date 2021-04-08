const expressJWT = require("express-jwt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireSignIn = function(req, res, next) {
    let token = req.header('auth-token');
    console.log(token)
     if(!token)
       return res.status(401).send("Access Denied");
  
     try {
       let verified = jwt.verify(token, process.env.SECRET_KEY);
       req.user = verified;
       next();
     } catch (err) {
      res.status(400).send('Invalid Token');
     }
 
  };



const isAuth = (req, res, next) => {
    let exist = req.profile && (req.profile._id == req.user._id)
    
    if(!exist){
        res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}


const isSeller = (req, res, next) => {
    if(!req.profile.status){
        return res.status(403).json({
            error: "Seller Ressource, Access Denied !!! "
        })
    }

    next()
}

const isSellerStatus = (req, res, next) => {
    if(req.profile.status === 'deactivated'){
        return res.status(403).json({
            error: "Seller, Access Denied your account id deactivated.!!! "
        })
    }

    next()
}

const isClient = (req, res, next)=>{
    if(!req.profile.salt){
        return res.status(403).json({
            error: "Client Ressource, Access Denied !!! "
        })
    }

    next()
}

const isAdmin = (req, res, next)=>{
    if(req.profile.salt || req.profile.status || req.profile.about){
        return res.status(403).json({
            error: "Admin Ressource, Access Denied !!! "
        })
    }

    next()
}


module.exports = { requireSignIn, isAuth, isAdmin, isSeller, isSellerStatus, isClient }