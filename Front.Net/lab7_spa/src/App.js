import React, { Component } from 'react';
import './App.css';
import PersonInput from './components/PersonInput';
import PersonItem from './components/PersonItem';
import Person from './components/Persons';
import Report from './components/Report';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header_menu">
          <Router>
            <div>
              <ul>
                <li><Link to="/">Persons</Link></li>
                <li><Link to="/report">Report</Link></li>
              </ul>

                <Route exact path="/" component={Person} />
                <Route exact path="/report" component={Report} />
                
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
