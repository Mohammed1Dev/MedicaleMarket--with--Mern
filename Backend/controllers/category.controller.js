const Category = require("../models/Category.model")

const createCategory = (req, res) => {

    const category = new Category(req.body);

    category.save((err, category) => {
         
        if(err) {
            return res.status(400).json({
                error: 'ERROR!!! Bad Request Category '
            })
        }

        res.json({
            category: category
        })
        console.log(req.header);

    })

}

const categoryId = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {

        if(err || !category) {
            return res.status(404).json({
                error: "Category not found !"
            })
        }

        req.category = category;
        next()
    })

} 


const showCategory = (req, res) => {

    let category = req.category;

    res.json({
        category
    })
}


const updateCategory = (req, res) => {

    let category = req.category;

    category.name = req.body.name;

    category.save((err, category) => {

        if(err) {
            return res.status(400).json({
                error: "Category have a Bad request !"
            })
        }

        res.json({
            category,
            message: 'Category updated Successfuly'
        })

    })

}


const deleteCategory = (req, res) => {

    let category = req.category;

    category.remove((err, category) => {

        if(err) {
            return res.status(404).json({
                error: "category not found !"
            })
        }

        res.status(204).json({
            message: 'Category deleted Successfuly'
        })

    })

}

const allCategories = (req, res) => {

    Category.find().exec((err, categories) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            categories
        })
    })
}


module.exports = { createCategory, categoryId, showCategory, updateCategory, deleteCategory, allCategories }