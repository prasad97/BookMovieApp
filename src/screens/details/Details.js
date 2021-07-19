import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from '../../common/header/Header';

// Styles
import './Details.css';

export default class Details extends Component {
    constructor() {
        super();
        this.state = {}
    }

    

    render() {
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} showBookButton="true" />
                <div className="back-btn">
                    <Typography>
                      <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>

                <h1>Detail Screen here</h1>
            </div>
        )
    }
}
