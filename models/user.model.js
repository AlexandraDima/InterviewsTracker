const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        //trim white spaces at the end
        trim: true,
        minlength: 3
    },
    location: {
        type: String,
        required: false
    }
},
    //create timestamps for when the user was created
    { timestamps: true }
);
 const User = mongoose.model('User', userSchema);
 module.exports = User;