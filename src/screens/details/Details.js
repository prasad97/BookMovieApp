import React, { Component } from 'react';

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
                <Header baseUrl={this.props.baseUrl} showBookButton="true"/>
                <h1>Detail Screen here</h1>
            </div>
        )
    }
}
