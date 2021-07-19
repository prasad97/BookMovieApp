// Imports
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import BookShow from '../screens/bookshow/BookShow'
import Confirmation from '../screens/confirmation/Confirmation'

export default class Controller extends Component {
    
    constructor(){
        super();
        this.baseUrl = "http://localhost:8085/api/v1/";
    }



    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl = {this.baseUrl}/> }  />
                    <Route path='/movie/:id' render={(props)=> <Details {...props} baseUrl = {this.baseUrl}/>} />
                    <Route path='/bookshow/:id' render={(props) => <BookShow {...props} baseUrl = {this.baseUrl} /> } />
                    <Route path='/confirm/:id' render={(props) => <Confirmation {...props} baseUrl = {this.baseUrl}  /> } /> 
                </div>
            </Router>
        )
    }
}
