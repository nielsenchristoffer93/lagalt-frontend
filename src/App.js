import React, { Component } from 'react';
import NavbarComponent from './components/navbar/Navbar';
import Footer from './components/Footer/Footer'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Welcome from './components/views/ProjectView';
import ProfileView from "./components/views/profileView/ProfileView";
import './App.css';

class App extends Component {


  render() {
    return (
        <BrowserRouter>
          <div style={{overflowX:"hidden"}}>   
          <NavbarComponent />
            <div className="container" style={{paddingTop:"100px"}}>
              <Switch>
                <Route path="/" exact>
                  <Welcome />
                </Route>
                  <Route path="/profile" exact>
                <ProfileView />
                </Route>
              </Switch>
            </div>
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}
export default App;