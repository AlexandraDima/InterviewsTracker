const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
/*     username: { type: String, required: true }, */
    userLocation:{type:String, required: false},
    companyName: { type: String, required: true },
    positionName: { type: String, required: true },
    jobPosting: { type: String, required: true },
    jobDescription: { type: String, required: true },
    dateApplied: { type: Date, required: true },
    dateDeadline: { type: Date, required: false },
    applied : { type: String, required: true },
    progress: { type: String, required: true },
    companyAddress:  { type: String, required: true },
    contactPersonName: { type: String, required: false },
    emailContactPerson:{ type: String, required: false },
},
    //create timestamps for when the user was created
    { timestamps: true }
);
 const Company = mongoose.model('Company', companySchema);
 module.exports = Company;