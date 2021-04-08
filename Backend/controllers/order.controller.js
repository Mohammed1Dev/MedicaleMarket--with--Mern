const {Order} = require('./../models/Order.model')


const create = (req, res) => {
    
    req.body = {
        ...req.body,
        user: req.profile
    }

    const order =  new Order(req.body)

    order.save((err, data) => {

        if(err){
            return res.status(400).json({error: err})
        }

        res.json(data)
    })
}

const listOrders = (req, res) => {
    Order.find()
         .populate('client', '_id fullname email')
         .sort('-createAt')
         .exec((err, orders) => {
             if(err){

                return res.status(400).json({error: err.message})
             }
                
             res.json(orders)
         })
}


const getStatus = (req, res) => {

    res.json({status: Order.schema.path('status').enumValues})
}



const updateOrderStatus = (req, res) => {
    Order.updateOne(
        {_id: req.order._id},
        {$set: {status: req.body.status}},
        (err, data) => {
            if(err){
                return res.status(400).json({error: err.message})
            }
            res.json(data)
        }
    )
}

module.exports = { create, listOrders, getStatus, updateOrderStatus}