const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressOptionsSchema = new Schema({
    progress: {
        type: String,
        required: true,
        unique: true,
        //trim white spaces at the end
        trim: true,
        minlength: 3
    }
}
);
 const Progress = mongoose.model('Progress', progressOptionsSchema);
 module.exports = Progress;