//Validation
const Joi = require('@hapi/joi');


const sellerRegisterValidation = data =>{
    const schema = Joi.object({
        firstname: Joi.string()
                .min(6)
                .required(),
        lastname: Joi.string()
                .min(6)
                .required(),
        experience: Joi.number()
                .integer()
                .min(10)
                .max(50),
        email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]{4,6})\.([a-zA-Z]{2,3})$'))
                .required()
                .email(),
        hashed_password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                    .min(6)
                    .required(),
        repeat_password: Joi.ref('hashed_password'),
        about: Joi.string()
                .min(15)
                .required(),

        // document: Joi.pattern(new RegExp('^([a-zA-Z0-9\s_\\.\-:])+(.doc|.docx|.pdf)$'))
    });

    

    return schema.validate(data);
};

const sellerLoginValidation = data=>{
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

module.exports = { sellerRegisterValidation, sellerLoginValidation }
