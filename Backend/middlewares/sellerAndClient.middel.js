const Seller = require("../models/Seller.model")
const Client = require("../models/Client.model")
const Admin = require('../models/Admin.model')

const adminById = (req, res, next, id) => {
    Admin.findById(id).exec((err, admin) => {

        if(err || !admin) {
            return res.status(404).json({
                error: "Admin not found !",
                kind: 'you must be a Admin to create a category or product'
            })
        }

        req.profile = admin
        next()
    })
}

const sellerById = (req, res, next, id) => {
    Seller.findById(id).exec((err, seller) => {
        

        if(err || !seller) {
            return res.status(404).json({
                error: "Seller not found !",
                kind: 'you must be a seller to create a category or product'
            })
        }

        req.profile = seller
        next()
    })
}

const clientById = (req, res, next, id) => {
    Client.findById(id).exec((err, client) => {

        if(err || !client) {
            return res.status(404).json({
                error: "Client not found !"
            })
        }

        req.profile = client
        next()
    })
}


const addProductsClientHistory = (req, res, next) => {

    let history = []

    history = req.body.products.map(product => {
        return {
            _id: product._id,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            amount: product.price * product.count, 
            transact_id: req.body.transactionId
        }
    })

   if(history.length) {
    Client.findByIdAndUpdate({_id: req.profile._id}, {$push: {history}}, {new: true}, (err, data) => {

     if(err) {
         return res.status(400).json({error: "Couldn't update user history !"})
     }
     return next()
        
    })
   }

   next()
}



module.exports = { adminById, sellerById, clientById, addProductsClientHistory }