const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const adminModel = new mongoose.Schema({
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
    }
}, 
{
    timestamps: true,
    versionKey: false
})

adminModel.virtual('fullName').get(function() {
    return this.firstname + ' ' + this.lastname;
  });




const authentificate = function(plainText){
    return bcrypt.compare(plainText, this.hashed_password);
}




adminModel.methods = { authentificate }


module.exports = mongoose.model('Admin', adminModel)