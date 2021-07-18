// Imports
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import Home from '../screens/home/Home';



export default class Controller extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={()=> <Home></Home> } />
                </div>
            </Router>
        )
    }
}
