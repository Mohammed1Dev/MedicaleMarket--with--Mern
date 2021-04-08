const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const clientModel = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 50,
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
    salt: {
        type: String,
        default: '-|-'
    },
    about: {
        type: String,
        trim: true
    },
    history: {
        type: Array,
        default: []
    }
}, 
{
    timestamps: true,
    versionKey: false
})

clientModel.virtual('fullName').get(function() {
    return this.firstname + ' ' + this.lastname;
  });


const authentificate = function(plainText){
    return bcrypt.compare(plainText, this.hashed_password);
}


clientModel.methods = { authentificate }


module.exports = mongoose.model('Client', clientModel)