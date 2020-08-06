import React, {Component} from 'react';
import CreateQuestion from "./CreateQuestion";
import QuestionList from "./QuestionList";



export default class Questions extends Component{

    render(){
        return(
         <div className="container">  
         <CreateQuestion />      
           
        <QuestionList />
      
             </div>

   
        )
    }
}