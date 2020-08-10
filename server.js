const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

//create express server
const app = express();
//port of the server
const PORT = process.env.PORT || 5000;

//use the middleware cors - access outside the server
app.use(cors());
//parse json - the server is sending and recieving json
app.use(express.json());
//connect to mongoose
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
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
 if(process.env.NODE_ENV === 'production'){
 //Set static folder
 app.use(express.static('client/build'));

 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
 })

} 
   

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})