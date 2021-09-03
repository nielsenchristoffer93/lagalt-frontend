import React, { Component } from 'react';
import NavbarComponent from './components/navbar/Navbar';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Welcome from './components/views/ProjectView';
import Secured from './Secured';
import ProfileView from "./components/views/ProfileView";
import './App.css';

class App extends Component {


  render() {
    return (
        <BrowserRouter>
                
          <div className="container">
            <NavbarComponent />
            <ul>
              {/* <li><Link to="/">public component</Link></li>
              <li><Link to="/secured">secured component</Link></li> */}

               
            </ul>
            <Switch>
         
          <Route path="/" exact>
          <Welcome />
          </Route>
          <Route path="/secured" exact>
          <Secured />
          </Route>
          <Route path="/profile" exact>
          <ProfileView />
          
          </Route>
          </Switch>
          </div>
        </BrowserRouter>
    );
  }
}
export default App;