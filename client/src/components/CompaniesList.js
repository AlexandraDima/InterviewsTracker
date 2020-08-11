import React, { Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "font-awesome/css/font-awesome.min.css";
import CreateCompany from './CreateCompany';
import ChartOvervew from './ChartOverview';


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
     
        <td>{props.company.foundedYear}</td>
        <td>{props.company.noEmployees}</td>
        <td> {data.distanceToLocation}</td> 
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
        this.filterProgress = this.filterProgress.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            companies: [],
            show: false,
            progressOptions:[] 
         
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
     
        
        //get progressOptions
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

    //companies list
    companiesList(){
 
        return this.state.companies.map(currentCompany=>{

            return <Company company={currentCompany} deleteCompany={this.deleteCompany}  key={currentCompany._id} />
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

             
    filterProgress(progressOption){
     axios.get('/companies/')
    .then(response => {
        if(progressOption){
            this.setState({
                companies: response.data.filter(company => company.progress === progressOption)
            })
        } else{
            this.setState({
                companies:response.data 
            })
        }
        
    })
  
    }

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
             <div className="row mx-auto d-flex flex-row-reverse">
        
             <button type="button" className="btn colorButton  mb-4"  title="Add a company" onClick={e => {
              this.showModal();}}><i className="fa fa-plus" aria-hidden="true"> Add</i>
              </button> 
              <CreateCompany onClose={this.showModal} show={this.state.show} />
       
           
             </div>
 
        
            <div className="row mb-3 mx-auto">
                <button type="button"  className="btn colorButton mr-2"  onClick={() => {this.filterProgress();}} title="all">all
                </button> 
                {this.state.progressOptions.map(progress => (
                <button type="button" key={progress._id} className={`btn colorButton mr-2 + ${progress.progress==='waiting' ? 'waiting' : progress.progress==='interview' ? 'interview' : 'rejected'}`} onClick={() => {this.filterProgress(progress.progress);}} >{progress.progress}
                </button> 
            ))}

            </div>
            
          
            <div>
            <table className="table tableCompanies table-hover ">
                 <thead className="tableThead">
                     <tr>
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
                         <th>Founded year </th> 
                         <th>No Employees </th> 
                        <th>Distance in km </th> 
                         <th>Action options</th>
                     </tr>
                 </thead>
                <tbody>
                    {this.companiesList()}
                </tbody>

            </table>
            </div>
          <div className="mx-auto m-4">
              <ChartOvervew />
          </div>
           
         </div>
        )
    }
}
