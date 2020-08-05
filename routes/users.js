const router = require('express').Router();
let User = require('../models/user.model');

//get users path
router.route('/').get((err,res,req) => {
//Mongoose method to get all the users
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Error: ' + err));
});

//post a user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const location = req.body.location;
    //create new instance of user with 2 properties
    const newUser = new User({username, location});

    //save the new user to the database
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//export the router
module.exports = router;

