// Imports
import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FormHelperText, Input, InputLabel, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormControl } from '@material-ui/core';

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


// https://material-ui.com/components/typography/
const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ textAlign: 'center', padding: 0 }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            isModalOpen: false,
            value: 0,
            username: '',
            usernameRequiredClass: 'none',
            password: '',
            passwordRequiredClass: 'none',
            firstname: '',
            firstnameRequiredClass: 'none',
            lastname: '',
            lastnameRequiredClass: 'none',
            email: '',
            emailRequiredClass: 'none',
            registrationPassword:'',
            registrationPasswordRequiredClass: 'none',
            contact:'',
            contactRequiredClass: 'none',
            registeredSuccessfully: false,
        }
    }

    // Modal Handlers
    openModalHandler = () => {
        this.setState({ isModalOpen: true });
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false });
    }

    tabSwitchHandler = (event, value) => {
        this.setState({ value: value })
    }

    // Form Data Change Handlers
    changeFormUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    changeFormPasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    changeFormFirstnameHandler = (event) => {
        this.setState({ firstname: event.target.value });
    }

    changeFormLastnameHandler = (event) => {
        this.setState({ lastname: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    changeRegistrationPasswordHandler = (event) => {
        this.setState({ registrationPassword: event.target.value });
    }

    changeContactHandler = (event) => {
        this.setState({ contact: event.target.value });
    }

    // Login / Logout handlers

    loginHandler = async () => {
        // alert("Login function Called");

        // validate data
        this.state.username === '' ? this.setState({ usernameRequiredClass: 'block' }) : this.setState({ usernameRequiredClass: 'none' });
        this.state.password === "" ? this.setState({ passwordRequiredClass: "block" }) : this.setState({ passwordRequiredClass: "none" });

        // return if blank username & password are passed
        if (this.state.username === "" || this.state.password === "") { return }

        //login user
        // console.log(this.props.baseUrl);

        const url = this.props.baseUrl + "auth/login";
        // console.log(url);
        const params = window.btoa(this.state.username + ":" + this.state.password);

        try {
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Authorization": `Basic ${params}`,
                }
            });

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response);
                // window.location.href = "/";
                window.sessionStorage.setItem('user-details', JSON.stringify(response));
                window.sessionStorage.setItem('userId', JSON.stringify(response.id));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                this.setState({ isLoggedIn: true });
                // console.log(that.state.isLoggedIn);
                this.closeModalHandler();
            }
            else {
                const error = new Error();
                error.message = 'Something went wrong.';
                throw error;
            }
        } catch (e) {
            alert(e.message);
        }


    }

    logoutHandler = () => {
        sessionStorage.removeItem('user-details');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('access-token');
        this.setState({ isLoggedIn: false });
    }

    // Register Handler
    registerHandler = async ()=> {

        // Validation
        this.state.firstname === ""? this.setState({firstnameRequiredClass:'block'}) : this.setState({firstnameRequiredClass:'none'});
        this.state.lastname === ""? this.setState({lastnameRequiredClass:'block'}) : this.setState({lastnameRequiredClass:'none'});
        this.state.email === ""? this.setState({emailRequiredClass:'block'}) : this.setState({emailRequiredClass:'none'});
        this.state.registrationPassword === ""? this.setState({registrationPasswordRequiredClass:'block'}) : this.setState({registrationPasswordRequiredClass:'none'});
        this.state.contact === ""? this.setState({contactRequiredClass:'block'}) : this.setState({contactRequiredClass:'none'});

        if(this.state.firstname === "" || this.state.lastname === "" || this.state.email === "" || this.state.registrationPassword === "" || this.state.contact === ""){
            return;
        }

        let data = {
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registrationPassword,
          }

        const url = this.props.baseUrl + "signup";
        
        try{
            // debugger;
            const rawResponse = await fetch(url,{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(data)
            });

            
            if(rawResponse.ok){
                // const response = await rawResponse.json();
                // console.log(response);
                this.setState({registeredSuccessfully : true});
            }
        }catch(e){
            alert(e.message);
        }
        
        
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
                            <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                Login
                            </Button>
                        </div> :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>}

                    {/* Bookshow Button */}
                    {/* This button should always be displayed in the header when a user clicks on a released movie, whether they are logged in or not. 
                    When a user is not logged in, clicking the Book Show button would open the modal that would ask them to log in/register on the application.*/}
                    {/* showBookButton prop to be sent from details screen later */}
                    {this.props.showBookButton === "true" && !this.state.isLoggedIn ?
                        <div className="book-button">
                            <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                                Book Show
                            </Button>
                        </div> : ""}


                    {/* If the user is logged in, then it would open the Book Show page, which you can find in the ‘bookshow’ folder, which is present in the ‘screens’ folder.  */}
                    {
                        // comment out once details screen is created
                        this.props.showBookButton === "true" &&
                        this.state.isLoggedIn ?
                            <div className="book-button">
                                <Link to={"/bookshow/" + this.props.id} >
                                    <Button variant="contained" color="primary">
                                        Book Show
                                    </Button>
                                </Link>
                            </div> : ""}
                </header>

                {/* Modal */}
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs value={this.state.value} onChange={this.tabSwitchHandler} className='tabs'>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input type="text" id="username" onChange={this.changeFormUsernameHandler} />
                                <FormHelperText className={this.state.usernameRequiredClass}>
                                    <span className='red'>
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input type="password" id="password" onChange={this.changeFormPasswordHandler} />
                                <FormHelperText className={this.state.passwordRequiredClass}>
                                    <span className='red'>
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginHandler}>LOGIN</Button>
                        </TabContainer>}
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input type="text" id="firstname" onChange={this.changeFormFirstnameHandler} />
                                <FormHelperText className={this.state.firstnameRequiredClass}>
                                    <span className='red'>
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input type="text" id="lastname" onChange={this.changeFormLastnameHandler} />
                                <FormHelperText className={this.state.lastnameRequiredClass}>
                                    <span className='red'>
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />

                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="email" onChange={this.changeEmailHandler} />
                                <FormHelperText className={this.state.emailRequiredClass}>
                                    <span className="red">
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl><br /><br />

                            <FormControl required>
                                <InputLabel htmlFor="registrationPassword">Password</InputLabel>
                                <Input type="password" id="registrationPassword" onChange={this.changeRegistrationPasswordHandler} />
                                <FormHelperText className={this.state.registrationPasswordRequiredClass}>
                                    <span className="red">
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl><br /><br />

                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No</InputLabel>
                                <Input id="contact" onChange={this.changeContactHandler} />
                                <FormHelperText className={this.state.contactRequiredClass}>
                                    <span className="red">
                                        required
                                    </span>
                                </FormHelperText>
                            </FormControl><br /><br />

                            {this.state.registeredSuccessfully === true &&
                                <FormControl>
                                    <span>Registration Successful. Please Login!</span>
                                </FormControl>}<br/><br />
                            
                            <Button variant="contained" color="primary"
                            onClick={this.registerHandler}>REGISTER</Button>

                        </TabContainer>}
                </Modal>




            </div>
        )
    }
}
