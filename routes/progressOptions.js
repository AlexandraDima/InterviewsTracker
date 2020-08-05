const router = require('express').Router();
let Progress = require('../models/progressOptions.model');

//get users path
router.route('/').get((err,res,req) => {
//Mongoose method to get all the users
    Progress.find()
    .then(options => res.json(options))
    .catch(err => res.status(500).json('Error: ' + err));
});

//post a user
router.route('/add').post((req, res) => {
    const progress = req.body.progress;

    const newProgress = new Progress({progress});

    //save the new user to the database
    newProgress.save()
        .then(() => res.json('Progress option added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//export the router
module.exports = router;