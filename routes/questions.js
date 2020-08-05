const router = require('express').Router();
let Question = require('../models/questions.model');

//get questions path
router.route('/').get((err,res,req) => {
//Mongoose method to get all the users
    Question.find()
    .then(options => res.json(options))
    .catch(err => res.status(500).json('Error: ' + err));
});

//post a question
router.route('/add').post((req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;

    const newQuestion = new Question({question, answer});

    //save the new user to the database
    newQuestion.save()
        .then(() => res.json('Question added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//find a question
router.route('/:id').get((req,res) => {
    Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Update a question
router.route('/update/:id').post((req,res) => {
    Question.findById(req.params.id)
    .then(question => {
        question.question = req.body.question;
        question.answer = req.body.answer;
        question.save()
        .then(() => res.json('Answers added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


//export the router
module.exports = router;