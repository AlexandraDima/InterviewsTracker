import React, {Component} from 'react';
import axios from 'axios'; 

export default class CreateQuestion extends Component{
          constructor(props){
            super(props)
            this.onChangeQuestion = this.onChangeQuestion.bind(this);
            this.onChangeAnswer = this.onChangeAnswer.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.state = {
                question: '',
                answer: ''
            }
        }
        onChangeQuestion(e){
            this.setState({
                question: e.target.value
            });
        }
        onChangeAnswer(e){
            this.setState({
                answer:e.target.value
            });
        }

          //on submit form
          onSubmit(e){
            e.preventDefault();
            const question = {
                question:this.state.question,
                answer:this.state.answer
            }
           
            //send the user data to the backend
            axios.post('/questions/add', question)
              .then(res => console.log(res.data));
            this.setState({
                question: '',
                answer:''
              }) 
        }
    render(){
        return(
    
            <div className="card-body mx-auto col-lg-11 mb-3">
              <form onSubmit={this.onSubmit}>
                <div className="form-row align-items-center">
                  <div className="col-md-5">
                    <input
                        type="text"
                      value={this.state.question}
                      onChange={this.onChangeQuestion}
                      placeholder="Ask a new question"
                      className="form-control mb-2"
                    />
                  </div>
                  <div className="col-md-5">
                    <input
                        type="text"
                      value={this.state.answer}
                      onChange={this.onChangeAnswer}
                      placeholder="Post an answer"
                      className="form-control mb-2"
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      type="submit"
                      value="Post a question" className="btn colorButtonRegister"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
 
       
        )
    }
}
