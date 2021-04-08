//Validation
const Joi = require('@hapi/joi');


const validateAdmin = data =>{
    const schema = Joi.object({
        firstname: Joi.string()
                .min(6)
                .required(),
        lastname: Joi.string()
                .min(6)
                .required(),
        email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]{4,6})\.([a-zA-Z]{2,3})$'))
                .required()
                .email(),
        hashed_password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                    .min(6)
                    .required(),
    });

    

    return schema.validate(data);
};

const adminLoginValidation = data=>{
        const schema = Joi.object({
            email: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]{4,6})\.([a-zA-Z]{2,3})$'))
                    .required()
                    .email(),
            hashed_password: Joi.string()
                        .min(6)
                        .required()
        });
        return schema.validate(data);
    };

module.exports = { validateAdmin, adminLoginValidation }