import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube'; //https://www.npmjs.com/package/react-youtube
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
                artists:[]
            },
            stars: [{
                id: 1,
                stateId: "1",
                color: "black"
            },
            {
                id: 2,
                stateId: "2",
                color: "black"
            },
            {
                id: 3,
                stateId: "3",
                color: "black"
            },
            {
                id: 4,
                stateId: "4",
                color: "black"
            },
            {
                id: 5,
                stateId: "5",
                color: "black"
            }]
        }
    }

    // Get Movie Detail
    getSelectedMovie = async () => {
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

    starClickHandler = (id) =>{
        let starList = [];
        for (let star of this.state.stars) {
            let selectedStar = star;
            if (star.id <= id) {
                selectedStar.color = "yellow"
            }
            else {
                selectedStar.color = "black";

            }
            starList.push(selectedStar);
        }
        this.setState({ stars: starList });
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
                    <div className="right">
                        <Typography>
                            <span className="text-bold">Rate this movie:</span>
                        </Typography>
                        {this.state.stars.map(star => {
                            return <StarBorderIcon className={star.color} key={"star" + star.id} onClick={() => this.starClickHandler(star.id)} />;
                        })}  
                        <div className="artists">
                            <Typography>
                                <span className="text-bold">Artists:</span>
                            </Typography>
                        </div>
                        <GridList cellHeight={160} cols={2}>
                            {this.state.movie.artists.map(artist => (
                                <GridListTile className="gridTile" onClick={() => this.artistClickHandler(artist.wiki_url)} key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
                
            </div>

        )
    }
}
