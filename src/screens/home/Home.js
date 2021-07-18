// Imports
import React, { Component } from 'react'
import Header from '../../common/header/Header'

// Styles
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* Header */}
                <Header  baseUrl={this.props.baseUrl}></Header>
                <div className='upcomingMoviesHeader'>
                    Upcoming Movies
                </div>
                <h1>Home Content</h1>
            </div>
        )
    }
}
