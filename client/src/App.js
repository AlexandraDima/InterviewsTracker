import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free';

import Navbar from "./components/Navbar"
import CompaniesList from "./components/CompaniesList"
import EditCompany from "./components/EditCompany"
import CreateCompany from "./components/CreateCompany"
/* import Users from "./components/Users" */
import QuestionsList from "./components/QuestionsList"
import EditQuestion from './components/EditQuestion';

function App() {
  return (
   //Map specific url paths to different components
    <Router>
      <div >
      <Navbar />
      <br/>
      <Route path="/" exact component={CompaniesList}/>
      <Route path="/edit/:id" component={EditCompany}/>
      <Route path="/create" component={CreateCompany}/>
      <Route path="/questionsList" component={QuestionsList} /> 
      <Route path="/editQuestion/:id" component={EditQuestion} />
      </div>
    </Router>
  );
}

export default App;
