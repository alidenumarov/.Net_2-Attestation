import React, { Component } from 'react';
import './App.css';
import RentApartments from './components/RentApartment';
import Report from './components/Report';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import RentApartment from './components/RentApartment';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header_menu">
          <Router>
            <div>
              <ul>
                <li><Link to="/">RentApartment</Link></li>
                <li><Link to="/report">Report</Link></li>
              </ul>

                <Route exact path="/" component={RentApartments} />
                <Route exact path="/report" component={Report} />
                
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
