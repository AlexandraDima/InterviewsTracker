import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import CreateUser from "./CreateUser";
import axios from 'axios';


const UsersList = props => (
    <tr>
        <td>{props.UsersList.username}</td>
   {/*      <td>{props.UsersList.location}</td> */}
       
    </tr>
)

export default class Users extends Component{
    constructor(props){
        super(props);
        this.state = {users: []};
    }
    componentDidMount(){
        axios.get('/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data,
                        //username: response.data[0].username
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
              })

     
    }

    usersList(){
        return this.state.users.map(currentUser=>{
            return <UsersList UsersList={currentUser} key={currentUser._id} />
        })
    }

    render(){
        return(
         <div className="container">
               <div className="row">
            <CreateUser />
            
             <div className="col-lg-6 shadowContainer">
             <table className="table">
                 <thead className="thead-light">
                     <tr>
                         <th>Username</th>
                  {/*        <th>Location </th> */}
                     </tr>
                 </thead>
                <tbody>
               {this.usersList()}
                </tbody>
            </table>
             </div>
         
             </div>

           
         </div>
        )
    }
}