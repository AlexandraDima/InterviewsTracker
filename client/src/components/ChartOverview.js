import React, {Component} from 'react';
import {Bar,Pie} from 'react-chartjs-2';
import axios from 'axios';

export default class ChartOverview extends Component{
   
    constructor(props){
        super(props);
        this.getChartData=this.getChartData.bind(this);
        this.getEmployeesData=this.getEmployeesData.bind(this);
        this.state={
            companies:[]
        }
    
    }

    //get the list of companies from the db
    componentDidMount(){

        axios.get('/companies/')
        .then(response => {
            this.setState({
                companies:response.data
                
            })
        })


    }

    getChartData(){
    let companyName =[];
    let years =[];
    
    for (let item of this.state.companies){
        companyName.push(item.companyName)
        years.push(item.foundedYear)
      
    }
      let dataChart={
        labels:companyName,
        datasets:[
            {
                label:"Founded year",
                data:years,
                backgroundColor:
                    'rgba(84, 114, 210, 0.8)'
                
                   
            }
        ]
       }
        return dataChart
          
        }

        getEmployeesData(){
            let companyName =[];
            let employees =[];
            
            for (let item of this.state.companies){
                companyName.push(item.companyName)
                employees.push(item.noEmployees)
              
            }
              let dataChart={
                labels:companyName,
                datasets:[
                    {
                        label:"Employees no",
                        data:employees,
                        backgroundColor:
                        'rgba(84, 114, 210, 0.8)'
                    }
                ]
               }
                return dataChart
                  
                }
    


    render(){
        return(
            <div className="container row chart">
                <div className="col-lg-6">
                <Bar
                data={this.getChartData}
                width={200}
                height={300}
                options={{ 
                    maintainAspectRatio: false,
                    title:{
                        display:true,
                        text:'Years the companies were founded',
                        fontSize: 16
                      },
                      legend:{
                        display:true, 
                        position: 'bottom',
                        labels:{
                        fontColor:'#000'
                      },
                        layout:{
                          padding:{
                            left:40
                          },
                          tooltips:{
                            enabled:true
                          }
                        }
                    }
        
        
                }}
                />
                </div>
              

                <div className="col-lg-6">
                <Pie
                data={this.getEmployeesData}
                width={200}
                height={300}
                options={{ 
                    maintainAspectRatio: false,
                    title:{
                        display:true,
                        text:'Number of employees',
                        fontSize: 16
                      },
                      legend:{
                        display:true, 
                        position: 'bottom',
                        labels:{
                        fontColor:'#000'
                      },
                        layout:{
                          padding:{
                            left:40
                          },
                          tooltips:{
                            enabled:true
                          }
                        }
                    }
        
        
                }}
                />
                </div>
            </div>
        )
    }
}