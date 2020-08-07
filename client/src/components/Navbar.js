import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({menu: !this.state.menu})
  }

    render(){
      const show = this.state.menu ? "show" : "";
        return(
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link className="navbar-brand text-white" to="/">Interview Tracker</Link>
              <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
              <span className="navbar-toggler-icon"></span>
            </button>
        
          <div className={` collapse navbar-collapse + ${show}`} >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link text-white" to="/">Logs</Link>
              </li>
            {/*   <li className="nav-item">
              <Link className="nav-link text-white" to="/users">Users</Link>
              </li> */}
              <li className="nav-item">
              <Link className="nav-link text-white" to="/questionsList">Questions</Link>
              </li>
          
            </ul>
       
          </div>
          </div>
        </nav>
        
        )
    }
}
