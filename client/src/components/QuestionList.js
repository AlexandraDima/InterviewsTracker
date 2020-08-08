import React, {Component} from 'react';
import EditQuestion from './EditQuestion';
import axios from 'axios';


export default class QuestionList extends Component {
    constructor(props){
        super(props)
        this.showEditQuestion = this.showEditQuestion.bind(this);
        this.state = {
            onShow:false,
            questions: []
           
        }
    }

    componentDidMount(){
        axios.get('/questions/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        questions: response.data
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
              })
    }

 
    showEditQuestion () {
        this.setState({
        onShow:  !this.state.onShow
        });
    };

   render(){
   return(

       <div className="card-column">
        
        {this.state.questions.map(question => 
        <div key={question._id} className="card-body cardDiv text-center shadowCard" >
        <h5 className="card-title mainColor">{question.question}</h5>
        <hr />
        <div className="mb-3"> <q className="card-text"> {question.answer}</q></div>
        <div>
      
        {this.state.onShow ? <i className="fa fa-times mainColor cursorPointer marginTop float-right" onClick={() => {
        this.showEditQuestion()  }}></i> : <i className="fa fa-pencil mainColor cursorPointer marginTop float-right" onClick={() => {
        this.showEditQuestion() }} ></i>  } 
     
        <hr ></hr>
          <EditQuestion onShow={this.state.onShow}  id={question._id}  />
            </div>
        </div>     
        )}
        </div>
    )}
}