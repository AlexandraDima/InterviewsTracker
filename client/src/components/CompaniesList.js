import React, { Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "font-awesome/css/font-awesome.min.css";
import CreateCompany from './CreateCompany';


function Company(props){
  const [data, setDistance] = useState([]);
     useEffect(() => {   
          axios.get('/companies/distances/' + props.company._id)
             .then(response =>   
                     setDistance(response.data)
            );
         
     },[props.company._id]);   

  return(
    <tr>
      {/*   <td className="fixedColumn">{props.company.username}</td> */}
        <td className="fixedColumn">{props.company.companyName}</td>
        <td>{props.company.positionName}</td>
        <td>{props.company.jobPosting}</td>
        <td>{props.company.jobDescription}</td>
        <td>{props.company.dateApplied.substring(0,10)}</td>
        <td>{props.company.dateDeadline.substring(0,10)}</td>
        <td>{props.company.applied}</td>
        <td className = {props.company.progress==='waiting' ? 'waiting' : props.company.progress==='interview' ? 'interview' : 'rejected' }>{props.company.progress}</td>
        <td>{props.company.userLocation}</td>
        <td>{props.company.companyAddress}</td>
         <td> {data.distance}</td> 
        <td>{data.duration}</td> 
        <td>
        <Link className="text-info" to={"/edit/" + props.company._id}><i className="fa fa-pencil mainColor"></i></Link> &nbsp;
         <i className="fa fa-trash mainColor cursorPointer" onClick={() => {props.deleteCompany(props.company._id)}}></i>
        </td> 
    </tr>
)
}
    


export default class CompaniesList extends Component{
    constructor(props){
        super(props);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            companies: [],
            show: false
            //users:[]
        };
    }

    //get the list of companies from the db
    componentDidMount(){
    
        axios.get('/companies/')
            .then(response => {
                this.setState({
                    companies:response.data
                    
                })
              
            })
            .catch((error)=>{
                console.log(error);
            })

        //get the users
        axios.get('/users/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    users: response.data
                })
            }
        })
        .catch((error)=>{
            console.log(error);
        });
      
    }
    


    

    //companies list
    companiesList(){
        return this.state.companies.map(currentCompany=>{

            return <Company company={currentCompany} deleteCompany={this.deleteCompany} key={currentCompany._id} />
        })
    }
    //delete company
    deleteCompany(id){
        //1. delete the company from the database
        axios.delete('/companies/' + id)
            .then(response => console.log(response.data));
        
        //2. delete the company row from the table and update the table
        this.setState({
            companies: this.state.companies.filter(company => company._id !== id)
        })
    }


        /* calculateDistance(usernameCompany){
            //const companyUsername = this.state.companies.forEach(company => (company.username));
            //console.log(companyUsername);
        
            //const companies = this.state.companies;
            const users = this.state.users;
        
                for(var j=0; j < users.length; j++){
                    var userName = users[j].username; 
                    //console.log(userName);
                    if(usernameCompany === userName){
                        var location = users[j].location;
                    // console.log(location);
                        return location;
                    } 
                
                }

        };
    */

        showModal () {
            this.setState({
            show:  !this.state.show
            });
        };
        onClose(e) {
            this.props.onClose && this.props.onClose(e);

        };

    render(){
        return(
         <div className="container">
             
              <button type="button" className="btn colorButton float-right mb-4"  title="Add a company" onClick={e => {
              this.showModal();}}><i className="fa fa-plus" aria-hidden="true"> Add</i>
              </button> 
              <CreateCompany onClose={this.showModal} show={this.state.show} />
           
            
              <table className="table tableCompanies table-hover ">
                 <thead className="tableThead">
                     <tr>
                        {/*  <th className="fixedColumn">User Name</th> */}
                         <th className="fixedColumn">Company name</th>
                         <th>Position name</th>
                         <th>Position Link</th>
                         <th>Job description</th>
                         <th>Date applied</th>
                         <th>Due date</th>
                         <th>Application submitted</th>
                         <th>Application progress</th>
                         <th>My location</th>
                         <th>Company Address</th> 
                         <th>Distance in km </th> 
                         <th>Duration by train </th> 
                         <th>Action options</th>
                     </tr>
                 </thead>
                <tbody>
                    {this.companiesList()}
                </tbody>

            </table>
   
            
            
           
         </div>
        )
    }
}
