// Imports
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../../common/header/Header';

// Styles
import "./Home.css";
import { Card, CardContent, Typography, InputLabel, Input, FormControl, Select, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { TextField, Button, MenuItem, ListItemText, Checkbox } from '@material-ui/core';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    upcomingMoviesHeader: {
        textAlign: 'center',
        padding: '8px',
        background: '#ff9999',
        fontSize: '1rem',
    },
    upcomingMoviesGrid: {
        width: '100%',
        flexWrap: 'nowrap',
    },
    releasedMoviesGrid: {
        cursor: 'pointer'
    },
    cardFormControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    cardTitle: {
        color: theme.palette.primary.light,
    }
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            upcomingMovies: [{}],
            releasedMovies: [{}],
            genresList: [{}],
            artistsList: [{}],
            movieName: '',
            genres: [],
            artists: [],
            releaseStartDate: '',
            releaseEndDate: '',
        }
    }

    // Get Upcoming Movies
    getUpcomingMovies = async () => {
        const url = this.props.baseUrl + 'movies?status=PUBLISHED';

        try {
            const rawResponse = await fetch(url);

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response.movies);
                this.setState({ upcomingMovies: response.movies });
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

    // Get Released Movies
    getReleasedMovies = async () => {
        const url = this.props.baseUrl + 'movies?status=RELEASED';

        try {
            const rawResponse = await fetch(url);

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response.movies);
                this.setState({ releasedMovies: response.movies });
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

    // Get Genres
    getGenres = async () => {
        const url = this.props.baseUrl + 'genres';

        try {
            const rawResponse = await fetch(url);

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response.genres);
                this.setState({ genresList: response.genres });
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

    // Get Genres
    getArtists = async () => {
        const url = this.props.baseUrl + 'artists';

        try {
            const rawResponse = await fetch(url);

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response.genres);
                this.setState({ artistsList: response.artists });
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

    // Get Released Movies
    getFilteredMovies = async (queryString) => {
        const url = this.props.baseUrl + 'movies' + encodeURI(queryString);
        console.log(url);

        try {
            const rawResponse = await fetch(url);

            if (rawResponse.ok) {
                const response = await rawResponse.json();
                // console.log(response.movies);
                this.setState({ releasedMovies: response.movies });
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

    componentWillMount() {
        this.getUpcomingMovies();
        this.getReleasedMovies();
        this.getGenres();
        this.getArtists();
    }

    movieClickHandler = (id) => {
        alert("Clicked on Movie with Id :" + id);
    }
    

    changeMovieNameHandler = (event) => {
        this.setState({ movieName: event.target.value });
    }

    changeGenreHandler = (event) => {
        this.setState({ genres: event.target.value });
    }

    changeArtistsHandler = (event) => {
        this.setState({ artists: event.target.value });
    }

    releaseStartDateHandler = (event) => {
        this.setState({ releaseStartDate: event.target.value });
    }

    releaseEndDateHandler = (event) => {
        this.setState({ releaseEndDate: event.target.value });
    }


    applyFilterHandler = () => {
        let string = '?status=RELEASED';
        if (this.state.movieName !== "") {
            string += "&title=" + this.state.movieName;
          }
          if (this.state.genres.length > 0) {
            string += "&genre=" + this.state.genres.toString();
          }
          if (this.state.artists.length > 0) {
            string += "&artist_name=" + this.state.artists.toString();
          }
          if (this.state.releaseStartDate !== "") {
            string += "&start_date=" + this.state.releaseStartDate
          }
          if (this.state.releaseEndDate !== "") {
            string += "&end_date=" + this.state.releaseEndDate
          }

          this.getFilteredMovies(string);
      
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* Header */}
                <Header baseUrl={this.props.baseUrl}></Header>
                <div className={classes.upcomingMoviesHeader}>
                    Upcoming Movies
                </div>
                {/* Upcoming Movies */}
                <GridList cols={6} cellHeight={250} className={classes.upcomingMoviesGrid}>
                    {this.state.upcomingMovies.map(movie => {
                        return <GridListTile key={"up" + movie.id}>
                            <img src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    })}
                </GridList>

                <div className="container">
                    <div className="left-container">
                        <GridList cols={4} cellHeight={350} className={classes.releasedMoviesGrid}>
                            {this.state.releasedMovies.map(movie => {
                                return <GridListTile onClick={() => this.movieClickHandler(movie.id)} key={"rel" + movie.id}>
                                    <img src={movie.poster_url} alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>
                                            Release Date: {new Date(movie.release_date).toString()}
                                        </span>}>
                                    </GridListTileBar>
                                </GridListTile>
                            })}
                        </GridList>
                    </div>
                    <div className="right-container">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.cardFormControl}>
                                    <Typography className={classes.cardTitle} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.cardFormControl}>
                                    <InputLabel htmlFor="movieName"> Movie Name </InputLabel>
                                    <Input id="movieName" onChange={this.changeMovieNameHandler} />
                                </FormControl>

                                <FormControl className={classes.cardFormControl}>
                                    <InputLabel htmlFor="genres"> Genre </InputLabel>
                                    <Select
                                        id="genres"
                                        onChange={this.changeGenreHandler}
                                        multiple
                                        input={<Input id="genres" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        value={this.state.genres}>
                                        <MenuItem value="0">None
                                        </MenuItem>
                                        {this.state.genresList.map(genre => (
                                            <MenuItem key={"gen" + genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > - 1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>

                                <FormControl className={classes.cardFormControl}>
                                    <InputLabel htmlFor="artists"> Artists </InputLabel>
                                    <Select
                                        id="artists"
                                        onChange={this.changeArtistsHandler}
                                        input={<Input id="artists" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        multiple>
                                        <MenuItem value="0">None</MenuItem>
                                        {this.state.artistsList.map(artist => (
                                            <MenuItem key={"art" + artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > - 1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.cardFormControl}>
                                    <TextField
                                        id="releaseStartDate"
                                        onChange={this.releaseStartDateHandler}
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        label="Release Date Start"
                                    />
                                </FormControl>

                                <FormControl className={classes.cardFormControl}>
                                    <TextField
                                        id="releaseEndDate"
                                        onChange={this.releaseEndDateHandler}
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        label="Release Date End"
                                    />
                                </FormControl>

                                <FormControl className={classes.cardFormControl}>
                                    <Button variant="contained" color="primary" onClick={() => this.applyFilterHandler()}>APPLY</Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(useStyles)(Home);