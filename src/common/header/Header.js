// Imports
import React, { Component } from 'react';
import logo from '../../assets/logo.svg';

// Styles
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <img src={logo} className="logo" alt="logo" />
                </header>
            </div>
        )
    }
}
