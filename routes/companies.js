const router = require('express').Router();
let Company = require('../models/companyLog.model');
 /* var distance = require('google-distance-matrix');
 distance.key('AIzaSyBY3nlDgNsrN9GvkXBQYu5JFIt49BCCJLU');
distance.mode('transit');
distance.transit_mode('train', 'bus'); */
const axios = require('axios');
const geolib = require('geolib');
 
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

//get the distances using Google Distance Matrix

//find a company
/* router.route('/distances/:id').get((req,res) => {
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
 */
//Get the distance using mapquest api, axios and geolib
router.route('/distances/:id').get((req,res) => {
    Company.findById(req.params.id)
   
    .then(company => 
        {
            destination = company.companyAddress;
            origin = company.userLocation;
            key = 'XdXvobIHEOHMLOx3ykPdZLZG7TxXhSy5';
            //var coordinates = [];
            let originR = axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${origin}`);
            let destinationR =  axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${destination}`);
            axios.all([originR, destinationR])
            .then(
                axios.spread((...responses) => {
                    getCoordinatesOrigin = responses[0].data.results;
                    getCoordinatesDestination = responses[1].data.results;

                    for(var i = 0; i < getCoordinatesOrigin.length; i++){
                        var locations = getCoordinatesOrigin[i].locations;
                        //console.log(locations);
                        for(var k = 0; k < locations.length; k++){
                         var latitude = locations[k].latLng.lat;
                         var longitude = locations[k].latLng.lng;
                         var start = {latitude: latitude, longitude: longitude};
                         }
                    }

                    for(var i = 0; i < getCoordinatesDestination.length; i++){
                        var locations = getCoordinatesDestination[i].locations;
                        for(var k = 0; k < locations.length; k++){
                         var latitude = locations[k].latLng.lat;
                         var longitude = locations[k].latLng.lng;
                         var end = {latitude: latitude, longitude: longitude};

                         }
                    }
                    var dist = geolib.getDistance(start, end);
                    var distConv = geolib.convertDistance(dist, 'km');
                    res.json({distanceToLocation:distConv.toFixed(2)});
                
                 
                })
            )

        }
       
        )
    .catch(err => res.status(400).json('Error: ' + err));
}); 



//export the router
module.exports = router;

