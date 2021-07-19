import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube'; //https://www.npmjs.com/package/react-youtube

// Components
import Header from '../../common/header/Header';

// Styles
import './Details.css';

export default class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie : {
                genres:[],
                trailer_url:'',
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
                console.log(response);
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
        const opts = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }
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
                    <div>
                            <Typography variant="headline" component="h2">{this.state.movie.title} </Typography>
                        </div>
                        <div>
                            <Typography><span className="text-bold">Genres: </span> {this.state.movie.genres.join(', ')} </Typography>
                        </div>
                        <div>
                            <Typography><span className="text-bold">Duration:</span> {this.state.movie.duration} </Typography>
                        </div>
                        <div>
                            <Typography><span className="text-bold">Release Date:</span> {new Date(this.state.movie.release_date).toDateString()} </Typography>
                        </div>
                        <div>
                            {/* critics_rating key not available in response as asked in question. */}
                            <Typography><span className="text-bold"> Rating:</span> {this.state.movie.rating}  </Typography>
                        </div>
                        <div className="storyLine">
                            <Typography><span className="text-bold">Plot:</span> <a href={this.state.movie.wiki_url}>(Wiki link)</a> {this.state.movie.storyline} </Typography>
                        </div>
                        <div className="trailerContainer">
                            <Typography><span className="text-bold">Trailer:</span></Typography>
                            <YouTube
                                videoId={this.state.movie.trailer_url.split("?v=")[1]}
                                opts={opts}
                                onReady={this._onReady}
                            />
                        </div>
                    </div>
                    <div className="left">

                    </div>
                </div>
                
            </div>

        )
    }
}
