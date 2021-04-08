const Order = require("./../models/Order.model")


exports.orderById = (req, res, next, id) => {

    Order.findById(id)
         .exec((err, order) => {
             if(err || !order){
                 return res.status(404).json({err: 'Order not found!'})
             }

             req.order = order
         })

         next()
}