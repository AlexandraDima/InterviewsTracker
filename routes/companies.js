const router = require('express').Router();
let Company = require('../models/companyLog.model');
var distance = require('google-distance-matrix');
DISTANCE_KEY = process.env.DISTANCE_KEY;
distance.key('DISTANCE_KEY');
distance.mode('transit');
distance.transit_mode('train', 'bus');

//get companies path
router.route('/').get((err,res,req) =>{
//Mongoose method to get all the companies
//Promise if the Exercise method is found
    Company.find()
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

//post a company
router.route('/add').post((req, res)=>{
   /*  const username = req.body.username; */
    const userLocation = req.body.userLocation;
    const companyName = req.body.companyName;
    const positionName = req.body.positionName;
    const jobPosting = req.body.jobPosting;
    const jobDescription = req.body.jobDescription;
    const dateApplied = Date.parse(req.body.dateApplied);
    const dateDeadline = Date.parse(req.body.dateDeadline);
    const applied = req.body.applied;
    const progress = req.body.progress;
    const companyAddress = req.body.companyAddress;
    const contactPersonName = req.body.contactPersonName;
    const emailContactPerson = req.body.emailContactPerson;

    //create new instance of company with the above properties
    const newCompany = new Company({username, userLocation, companyName, positionName,jobPosting,jobDescription,dateApplied,dateDeadline,applied,progress,companyAddress,contactPersonName,emailContactPerson});

    //save the new user to the database
        newCompany.save()
        .then(() => res.json('Company added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//find a company
router.route('/:id').get((req,res) => {
    Company.findById(req.params.id)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete a company
router.route('/:id').delete((req, res) => {
    Company.findByIdAndDelete(req.params.id)
    .then(() => res.json('Company was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update a company
router.route('/update/:id').post((req, res) => {
    Company.findById(req.params.id)

    .then(company => {
        /* company.username = req.body.username; */
        company.userLocation = req.body.userLocation;
        company.companyName = req.body.companyName;
        company.positionName = req.body.positionName;
        company.jobPosting = req.body.jobPosting;
        company.jobDescription = req.body.jobDescription;
        company.dateApplied = Date.parse(req.body.dateApplied);
        company.dateDeadline = Date.parse(req.body.dateDeadline);
        company.applied = Boolean(req.body.applied);
        company.progress = req.body.progress;
        company.companyAddress = req.body.companyAddress;
        company.contactPersonName = req.body.contactPersonName;
        company.emailContactPerson = req.body.emailContactPerson;

        company.save()
        .then(() => res.json('Company updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//get the distances

//find a company
router.route('/distances/:id').get((req,res) => {
    Company.findById(req.params.id)
   
    .then(company => 
        {
            let destination = company.companyAddress;
            let origin = company.userLocation;
            distance.matrix( [origin],[destination], function (err, distances) {
                if (!err)
                var rowsDistances = distances.rows;
                for(var i=0; i < rowsDistances.length; i++){
                    var element = rowsDistances[i].elements;
                    for(var j=0; j < element.length; j++){
                        var distance = element[i].distance.text;
                        var duration = element[i].duration.text;
                        res.json({distance: distance, duration: duration});
                    }
                    
                }
             
               // res.json(distances.rows);
            })

          

        }
       
        )
    .catch(err => res.status(400).json('Error: ' + err));
}); 





//export the router
module.exports = router;

