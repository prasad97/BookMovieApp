// Imports
import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Styles
import './Header.css';


export default class Header extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn:true,
        }
    }
    
    openModalHandler = ()=>{
        alert("Open Modal triggered.")
    }


    render() {
        return (
            <div>
                <header className="header">
                    <img src={logo} className="logo" alt="logo" />

                    {/* Login/Logout button */}
                    {!this.state.isLoggedIn ? 
                    <div className="login-button">
                        <Button variant="contained" color="default">
                            Login
                        </Button>
                    </div> :
                    <div className="login-button">
                        <Button variant="contained" color="default">
                            Logout
                        </Button>
                    </div>}
                    
                    {/* Bookshow Button */}
                    {/* This button should always be displayed in the header when a user clicks on a released movie, whether they are logged in or not. 
                    When a user is not logged in, clicking the Book Show button would open the modal that would ask them to log in/register on the application.*/}
                    {/* showBookButton prop to be sent from details screen later */}
                    {this.props.showBookButton === true && !this.state.isLoggedIn ?
                    <div className="book-button">
                        <Button variant="contained" color="primary" onClick = {this.openModalHandler}>
                            Book Show
                        </Button>
                    </div>: ""}


                    {/* If the user is logged in, then it would open the Book Show page, which you can find in the ‘bookshow’ folder, which is present in the ‘screens’ folder.  */}
                    {
                    // comment out once details screen is created
                    // this.props.showBookShowButton === "true" &&
                    this.state.isLoggedIn ? 
                    <div className="book-button">
                        <Link to={"/bookshow/"} >
                            <Button variant="contained" color="primary">
                                Book Show
                            </Button> 
                        </Link>
                    </div>: ""}
                    

                </header>
            </div>
        )
    }
}
