const mongoose = require('mongoose')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { v4 : uuidv4 } = require('uuid');

const sellerModel = new mongoose.Schema({
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
    experience: {
        type: Number,
        default: null
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
    account: {
        type: String,
        default: 'Beginner'
    },
    status : {
        type : String,
        default: 'deactivate'
    },
    about: {
        type: String,
        trim: true
    },
    document : {
        data: Buffer,
        contentType: String
  
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

sellerModel.virtual('fullName').get(function() {
    return this.firstname + ' ' + this.lastname;
  });


const authentificate = function(plainText){
    return bcrypt.compare(plainText, this.hashed_password);
}



sellerModel.methods = { authentificate }


module.exports = mongoose.model('Seller', sellerModel)