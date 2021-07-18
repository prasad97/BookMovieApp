// Imports
import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Tab, Tabs } from '@material-ui/core';

// Styles
import './Header.css';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


export default class Header extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn:false,
            isModalOpen:false,
            value:0,
        }
    }
    
    openModalHandler = ()=>{
        this.setState({isModalOpen:true});
    }

    closeModalHandler = ()=>{
        this.setState({isModalOpen:false});
    }

    logoutHandler = ()=>{
        alert("Logout")
    }

    tabSwitchHandler = (event, value)=>{
        this.setState({value : value})
    }



    render() {
        return (
            <div>
                {/* Header */}
                <header className="header">
                    <img src={logo} className="logo" alt="logo" />

                    {/* Login/Logout button */}
                    {!this.state.isLoggedIn ? 
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick = {this.openModalHandler}>
                            Login
                        </Button>
                    </div> :
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick = {this.logoutHandler}>
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
                
                {/* Modal */}
                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModalHandler}
                    style = {customStyles}
                    >
                    <Tabs value={this.state.value} onChange = {this.tabSwitchHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>    
                </Modal>




            </div>
        )
    }
}
