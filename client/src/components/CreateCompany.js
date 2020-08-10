import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {Modal} from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";


export default class CreateCompany extends Component{
    constructor(props){
        super(props)
        //binding this to the properties from the state

     /*    this.onChangeUsername = this.onChangeUsername.bind(this); */
        this.onChangeUserLocation = this.onChangeUserLocation.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangePositionName = this.onChangePositionName.bind(this);
        this.onChangeJobPosting = this.onChangeJobPosting.bind(this);
        this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
        this.onChangeApplied = this.onChangeApplied.bind(this);
        this.onChangeDateApplied = this.onChangeDateApplied.bind(this);
        this.onChangeDateDeadline = this.onChangeDateDeadline.bind(this);
        this.onChangeProgress = this.onChangeProgress.bind(this);
        this.onChangeCompanyAddress = this.onChangeCompanyAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this); 
       // this.setShow = this.setShow.bind(this);
    
        //set the initial state of the component by assigning an object to this.state
        //create properties inside the state that correspond to the properties from MOngoDB
        this.state = {
        /*     username: '', */
            userLocation:'',
            companyName:'',
            positionName:'',
            jobPosting:'',
            jobDescription:'',
            applied:false,
            dateApplied:new Date(),
            dateDeadline:new Date(),
            progress:'waiting',
            companyAddress:'',
            users:[],
            progressOptions:[],
        }
    }

    //add a lifecicle method to be called before the other methods are being called
    //call the users
    componentDidMount(){
        /*Set testing data before calling the api
        this.setState({
            users: ['test user'],
            username:'test user'
        })**/
        //get the list of users
   /*      axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                
                }
            }) */
        
        //get the list of progress options
        axios.get('/progressOptions/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    progressOptions: response.data,
                })
            }
        })
        .catch(function (error) {
              console.log(error);
        })
   
  
    }

  
    //when the form inputs are changed, the properties from the state will be updated

    onChangeUserLocation(e){
        this.setState({
            userLocation: e.target.value
        });
    }

    onChangeCompanyName(e){
        this.setState({
            companyName: e.target.value
        });
    }
    onChangePositionName(e){
        this.setState({
            positionName: e.target.value
        });
    }
    onChangeJobPosting(e){
        this.setState({
            jobPosting: e.target.value
        });
    }
    onChangeJobDescription(e){
        this.setState({
            jobDescription: e.target.value
        });
    }
    onChangeApplied(e){
        this.setState({
            applied: e.target.value
        });
    }
    onChangeDateApplied(date){
        this.setState({
            dateApplied: date
        });
    }
    onChangeDateDeadline(date){
        this.setState({
            dateDeadline: date
        });
    }
    onChangeProgress(e){
        this.setState({
            progress: e.target.value
        });
    }
    onChangeCompanyAddress(e){
        this.setState({
            companyAddress: e.target.value
        });
    }
   
     

    //on submit form
    onSubmit(e){
        e.preventDefault();
        const company = {
         /*    username:this.state.username, */
            userLocation:this.state.userLocation,
            companyName:this.state.companyName,
            positionName:this.state.positionName,
            jobPosting:this.state.jobPosting,
            jobDescription:this.state.jobDescription,
            applied:this.state.applied,
            dateApplied:this.state.dateApplied,
            dateDeadline:this.state.dateDeadline,
            progress:this.state.progress,
            companyAddress:this.state.companyAddress,
        }
        console.log(company);
        axios.post('/companies/add', company)
              .then(res => console.log(res.data));

        //once the user submits a company, he will be redirected to the home page
        window.location = '/';
    }

  //Close the modal
        onClose = e => {
            this.props.onClose && this.props.onClose(e);
          };

    render(){
        if(!this.props.show){
            return null;
        }
        return(
            <div>
             {this.props.children}
          
           
            <Modal  show={true} size="lg">
        
             <div className="container">
             <Modal.Header>
           
               <Modal.Title><h1>Add a company log</h1></Modal.Title>
               <i className="fa fa-times fa-2 cursorPointer" aria-hidden="true" onClick={this.onClose}></i>
               </Modal.Header>
               <Modal.Body>
            <form onSubmit={this.onSubmit}>
                
                  {/*   <div className="form-group"> 
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map((user) =>
                             <option key={user} value={user}>{user}</option>
                            )
                        }
                    </select>
                    </div> */}
                    
                    <div className="form-group"> 
                    <label>Company name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.companyName}
                        onChange={this.onChangeCompanyName}
                        />
                    </div>
                
                    <div className="form-group">
                    <label> Position name:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.positionName}
                        onChange={this.onChangePositionName}
                        />
                    </div>
                    <div className="form-group">
                    <label> Job Posting:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.jobPosting}
                        onChange={this.onChangeJobPosting}
                        />
                    </div>
                    <div className="form-group">
                    <label> Job description:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.jobDescription}
                        onChange={this.onChangeJobDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date applied: </label>
                    <div>
                        <DatePicker
                        selected={this.state.dateApplied}
                        onChange={this.onChangeDateApplied}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <label>Due date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.dateDeadline}
                        onChange={this.onChangeDateDeadline}
                        />
                    </div>
                    </div>

                    <div className="form-group"> 
                    <label>Applied </label>
                    <input
                        className="form-control"
                        value={this.state.applied}
                        onChange={this.onChangeApplied}/>
                
                    </div>
                    
                    <div className="form-group">
                    <label> Progress:</label> 
                    <select 
                        className="form-control"
                        value={this.state.progress}
                        onChange={this.onChangeProgress}>
                        {
                        this.state.progressOptions.map(function(progress) {
                        return <option key={progress._id} value={progress.progress}>{progress.progress}</option>;
                        })
                        }
                    </select>
                    </div>
                    <div className="form-group"> 
                    <label>My location: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.userLocation}
                        onChange={this.onChangeUserLocation}
                        />
                    </div>
                    <div className="form-group">
                    <label> Company Address:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.companyAddress}
                        onChange={this.onChangeCompanyAddress}
                        />
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Add company log" className="btn btn-primary" />
                 
                    </div>
           
                </form>
                   </Modal.Body>
                </div>
           </Modal>
           </div>
        )
    }
}
