const Product = require("../models/Product.model")
const Seller = require('../models/Seller.model')
const formidable = require('formidable');
const fs = require("fs")
const lodash = require("lodash")
const { validateProduct } = require('../validation/productValidation')


const createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
      if(err){
          return res.status(400).json({
              error: "Image could nor update"
          })
      }

        const {error} = validateProduct(fields);
        if(error) return res.status(400).send(error.details[0].message);
        let product = new Product(fields);

      if(files.photo){

        if(files.photo.size > Math.pow(12, 6)){
            return res.status(400).json({
                error: "Image should be less than 2,9 Mo in size !"
            })
        }
          product.photo.data = fs.readFileSync(files.photo.path)
          product.photo.contentType = files.photo.type
      }

      let history = []

      history = product
  
     if(history.length && req.profile.account === 'Beginner' && req.profile.history.length < 10) {

         Seller.findByIdAndUpdate({_id: req.profile._id}, {$push: {history}}, {new: true}, (err, data) => {
  
            if(err) {
                return res.status(400).json({error: "Couldn't update Seller history !"})
            }
            
            product.save((err, product) => {
                if(err){
                    return res.status(400).json({
                        error: err.message
                    })
                }
                
                    res.json({
                        product
                    })
            })
          
      })
     }else if(history.length && req.profile.account === 'Pro' && req.profile.history.length < 50){

        Seller.findByIdAndUpdate({_id: req.profile._id}, {$push: {history}}, {new: true}, (err, data) => {
  
            if(err) {
                return res.status(400).json({error: "Couldn't update Seller history !"})
            }
            
            product.save((err, product) => {
                if(err){
                    return res.status(400).json({
                        error: err.message
                    })
                }
                
                    res.json({
                        product
                    })
            })
          
      })
     }else if(history.length && req.profile.account === 'Expert' ){

        Seller.findByIdAndUpdate({_id: req.profile._id}, {$push: {history}}, {new: true}, (err, data) => {
  
            if(err) {
                return res.status(400).json({error: "Couldn't update Seller history !"})
            }
            
            product.save((err, product) => {
                if(err){
                    return res.status(400).json({
                        error: err.message
                    })
                }
                
                    res.json({
                        product
                    })
            })
          
      })
     }
   

  })

}


const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
  
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not update"
            })
        }
  
        let product = req.product

        product = lodash.extend(product, fields)
  
        if(files.photo){
  
          if(files.photo.size > Math.pow(10, 6)){
              return res.status(400).json({
                  error: "Image should be less than 1Mo in size !"
              })
          }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
  
        //Validation of fields with Joi 
        const {error} = validateProduct(fields);
        if(error) return res.status(400).send(error.details[0].message);

        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
  
            res.json({
                product
            })
        })
    })
  
  }

const productById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        req.product = product
        next()
    })
}


const showProduct = (req, res) => {
    req.product.photo = undefined

    res.json({
        product : req.product
    })
}


const deleteProduct = (req, res) => {
    let product = req.product

    product.remove((err, product) => {
        if(err) {
            return res.status(404).json({
                error: 'Product not Found !'
            })
        }

        res.status(204).json({})
    })
}

const allProducts = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    
    let query = {}

    let {search, category} = req.query;

    if(search){
        query.name = {$regex: search, $options: 'i'}
    }

    if(category){
        query.category = category
    }

    Product.find(query)
           .select("-photo") //not show url photo in query uri
           .populate('category') // afficher la category de la produit dans uri
           .sort([[sortBy, order]])
           .limit(limit)
           .exec((err, products) => {
               if(err){
                   return res.status(404).json({
                       error: "Products not found"
                   })
               }
               res.json({
                   products
               })
           })

           // localhost:8000/api/product?limit=4&sortBy=category&order=desc
           // ---> limit = 4 product
           // ---> sortBy = {category, description, name} tu choix le propritie que tu peux filtrer
           // ---> order= (desc || asc)  ++++ decroissante || croissante ++

}

const relatedProduct =(req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 2;

    Product.find({category: req.product.category,
                 _id: {$ne : req.product._id} // not give to me id of the product 
           })
    .limit(limit)
    .select("-photo")
    .populate('category', 'id name')
    .exec((err, products) => {
        if(err){
            res.status(404).json({
                error: "Product not found !"
            })
        }

        res.json({
            products
        })
    })

}

// search product 
const searchProduct = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : "asc"; // a-z not z-a il prend en consédiration l'alhabétique de les mots les produits
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    console.log(req.body.filters)

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
       
     if(key === "price"){
                // gte - greater than price [0-10]
                // lte - less than

                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            }else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
           .select("-photo") //not show url photo in query uri
           .populate('category') // afficher la category de la produit dans uri
           .sort([[sortBy, order]])
           .limit(limit)
           .skip(skip)
           .exec((err, products) => {
               if(err){
                   return res.status(404).json({
                       error: "Products not found"
                   })
               }
               res.json({
                   products
               })
           })


}

// get photo from data base
const photoProduct = (req, res) => {
    const {contentType, data} = req.product.photo

    if(data) {
        res.set("Content-Type" , contentType)
        
        return res.send(data)
    }
}

module.exports = {
    createProduct,
    updateProduct,
    productById,
    showProduct,
    deleteProduct,
    allProducts,
    relatedProduct,
    searchProduct,
    photoProduct
}