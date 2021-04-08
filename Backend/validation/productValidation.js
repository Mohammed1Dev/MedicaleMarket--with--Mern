//Validation
const Joi = require('@hapi/joi');


const validateProduct = data =>{
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        description: Joi.string()
                .min(25)
                .required(),
        price: Joi.number()
                .required(),
        quantity: Joi.number()
                .required(),
        category: Joi.required()
    });

    

    return schema.validate(data);
};






module.exports = { validateProduct }