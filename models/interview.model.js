const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
    interviewName: { type: String},
    companyName: { type: String},
    positionName: { type: String},
    dateInterview: { type: Date},
    interviewStage : { type: String},
   // questions: {type: Array, required: false, question:  { type: String, answer:{type:String}}},
   questions: {type: Array},
    tasks: { type: Array, required: false }
},
    //create timestamps for when the interview was created
    { timestamps: true }
);
 const Interview = mongoose.model('Interview', interviewSchema);
 module.exports = Interview;