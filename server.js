const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

//create express server
const app = express();
//port of the server
const port = process.env.port || 5000;

//use the middleware cors - access outside the server
app.use(cors());
//parse json - the server is sending and recieving json
app.use(express.json());

//connect to mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose connection established successfully');
})

//require the routes
const companiesRouter = require('./routes/companies');
const usersRouter = require('./routes/users');
const progressRouter = require('./routes/progressOptions')
const interviewsRouter = require('./routes/interviews')
const questionsRouter = require('./routes/questions')
app.use('/companies', companiesRouter);
app.use('/users', usersRouter);
app.use('/progressOptions', progressRouter);
app.use('/interviews', interviewsRouter);
app.use('/questions', questionsRouter);


//Server static assets if in production

    //Set static folder
    app.use(express.static('frontend/build'));


 
//start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})