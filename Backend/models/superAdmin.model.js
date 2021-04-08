const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const superAdminModel = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        maxlength: 35,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 35,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    }
}, 
{
    timestamps: true,
    versionKey: false
})

superAdminModel.virtual('fullName').get(function() {
    return this.firstname + ' | ' + this.lastname;
  });


const authentificate = function(plainText){
    return bcrypt.compare(plainText, this.hashed_password);
}



superAdminModel.methods = { authentificate }


module.exports = mongoose.model('superAdmin', superAdminModel)