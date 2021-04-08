const express = require('express');
require('./database/config')
const fs = require('fs');
const bodyParser= require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const dotenv = require("dotenv")

const clientAuthentification = require('./routes/client.route')
const sellerAuthentification = require('./routes/seller.route')
const superAdminSection = require('./routes/superAdmin.route')
const adminAuthentification = require('./routes/admin.route')
const categorySection = require('./routes/category.route')
const productSection = require('./routes/product.route')
const orderSection = require('./routes/order.route')
const app = express()

dotenv.config()




// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({inflate: true}));

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 
//   }

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser())
app.options('*', cors()) 
app.use(cors())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTION");
    next();
    })



//import routes
app.use('/API', superAdminSection)
app.use('/API', adminAuthentification)
app.use('/API', sellerAuthentification)
app.use('/API', clientAuthentification)
app.use('/API/category', categorySection)
app.use('/API/product', productSection)
app.use('/API/Order', orderSection)

//lanching Server 
app.listen(process.env.PORT || 2020, (err)=>{

    if(err) return console.log('Server not Connected');

    console.log('Server listen On '+ process.env.PORT);
})