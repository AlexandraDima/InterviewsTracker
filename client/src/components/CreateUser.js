import React, {Component} from 'react';
import axios from 'axios'; 

export default class CreateUser extends Component{
          constructor(props){
            super(props)
            this.onChangeUsername = this.onChangeUsername.bind(this);
  /*           this.onChangeLocation = this.onChangeLocation.bind(this); */
            this.onSubmit = this.onSubmit.bind(this);
            this.state = {
                username: ''
             /*    location: '' */
            
            }
        

        }
        onChangeUsername(e){
            this.setState({
                username: e.target.value
            });
        }

    /*     onChangeLocation(e){
            this.setState({
                location: e.target.value
            });
        } */

          //on submit form
          onSubmit(e){
            e.preventDefault();
            const user = {
                username:this.state.username,
                location:this.state.location
            }
            console.log(user);

            //send the user data to the backend
            axios.post('/users/add', user)
              .then(res => console.log(res.data));
            this.setState({
                username: '',
          /*       location: '' */
              }) 
        }
    render(){
        return(
          <div className="col-lg-5 shadowContainer">
          <h1>Add a user</h1>
       <form onSubmit={this.onSubmit}>
           
               <div className="form-group"> 
               <label>Username: </label>
               <input  type="text"
                   required
                   className="form-control"
                   value={this.state.username}
                   onChange={this.onChangeUsername}
               />
               </div>
         {/*       <div className="form-group"> 
               <label>Location: </label>
               <input  type="text"
                   required
                   className="form-control"
                   value={this.state.location}
                   onChange={this.onChangeLocation}
                   />
               </div> */}
           
              

               <div className="form-group">
               <input type="submit" value="Add a user" className="btn colorButton" />
               </div>
           </form>

      </div>
        )
    }
}
