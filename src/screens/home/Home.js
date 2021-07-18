// Imports
import React, { Component } from 'react'
import Header from '../../common/header/Header'

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* Header */}
                <Header  baseUrl={this.props.baseUrl}></Header>
                
                <h1>Home Content</h1>
            </div>
        )
    }
}
