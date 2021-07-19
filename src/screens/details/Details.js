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
        this.state = {
            movie : {

            }
        }
    }

    // Get Movie Detail
    getSelectedMovie = async (queryString) => {
        const url = this.props.baseUrl + 'movies/' + this.props.match.params.id;
        // console.log(url);

        try {
            const rawResponse = await fetch(url);

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response);
                this.setState({ movie: response});
            }
            else {
                const error = new Error();
                error.message = "Some Error Occurred";
                throw error;
            }
        } catch (e) {
            alert(e.message);
        }
    }

    componentWillMount(){
        this.getSelectedMovie();
    }

    render() {
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} showBookButton="true"  id={this.props.match.params.id} />
                <div className="back-btn">
                    <Typography>
                      <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>

                <div className="container">
                    <div className="left">
                        <img src={this.state.movie.poster_url} alt={this.state.movie.title}/>
                    </div>
                    <div className="middle">

                    </div>
                    <div className="left">

                    </div>
                </div>
                
            </div>

        )
    }
}
