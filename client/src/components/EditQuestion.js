import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "font-awesome/css/font-awesome.min.css";
import axios from 'axios';

export default class EditQuestion extends Component{
    constructor(props){
        super(props)
        //binding this to the properties from the state
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.handleClose = this.handleClose.bind(this); 
        
        this.submitQuestion = this.submitQuestion.bind(this);
        //set the initial state of the component by assigning an object to this.state
        //create properties inside the state that correspond to the properties from MOngoDB
        this.state = {
            question:'',
            answer:''
          
        }
    }

    //add a lifecicle method to be called before the other methods are being called
    componentDidMount(){
        //get the question
   axios.get('/questions/' + this.props.id)
        .then(response => {
                this.setState({
                    question: response.data.question,
                    answer:response.data.answer
                })   
        })
        .catch(function (error) {
            console.log(error);
          })  
      
    } 

    //Close the modal
    handleClose = e => {
        this.props.handleClose && this.props.handleClose(e);
    };

    onChangeQuestion(e){
        this.setState({
            question: e.target.value
        });
    }


    onChangeAnswer(e){
        this.setState({
            answer: e.target.value
        });
    }
   

    //on submit form
    submitQuestion(e){
        e.preventDefault();
   
        const question = {
            question:this.state.question,
            answer:this.state.answer
        }
        console.log(question);
        axios.post('/questions/update/' + this.props.id, question)
        .then(res => console.log(res.data));


        window.location = '/questions';
      
        
    }

    render(){
        if(!this.props.onShow){
            return null;
        }
        return(
            <div>
            {this.props.children}  
   
          <div className="container">
          <h5>Edit question</h5>
         
            <form onSubmit={this.submitQuestion}>
        
              <div className="form-group"> 
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.question}
                  onChange={this.onChangeQuestion}
                  />
              </div>
          
              <div className="form-group">
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.answer}
                  onChange={this.onChangeAnswer}
                  />
              </div>

              <div className="form-group">
              <input type="submit" value="Update question" className="btn colorButton" />
              </div>
          </form>
             </div>
        
     </div>
        )
    }
}

