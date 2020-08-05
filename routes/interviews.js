const router = require('express').Router();
let Interview = require('../models/interview.model');

//get interview path
router.route('/').get((err,res,req) =>{
//Mongoose method to get all the companies
//Promise if the Exercise method is found
    Interview.find()
    .then(interview => res.json(interview))
    .catch(err => res.status(400).json('Error: ' + err));
});

//post an interview
router.route('/add').post((req, res)=>{
    const interviewName = req.body.interviewName;
    const companyName = req.body.companyName;
    const positionName = req.body.positionName;
    const dateInterview = Date.parse(req.body.dateInterview);
    const interviewStage = req.body.interviewStage;
    const questions = req.body.questions;
    const tasks = req.body.tasks;

    //create new instance of interview with the above properties
    const newInterview = new Interview({interviewName, companyName, positionName,dateInterview,interviewStage,questions,tasks});

    //save the new user to the database
        newInterview.save()
        .then(() => res.json('Interview added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//find an interview
router.route('/:id').get((req,res) => {
    Interview.findById(req.params.id)
    .then(interview => res.json(interview))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete an interview
router.route('/:id').delete((req, res) => {
    Interview.findByIdAndDelete(req.params.id)
    .then(() => res.json('Interview was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update 
router.route('/update/:id').post((req, res) => {
    Interview.findById(req.params.id)

    .then(interview => {
        interview.interviewName = req.body.interviewName;
        interview.companyName = req.body.companyName;
        interview.positionName = req.body.positionName;
        interview.dateInterview = Date.parse(req.body.dateInterview);
        interview.interviewStage = Boolean(req.body.interviewStage);
        interview.questions = req.body.questions;
        //interview.answer = req.body.answer;
        interview.tasks = req.body.tasks;
        interview.save()
        .then(() => res.json('Interview updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


//export the router
module.exports = router;

