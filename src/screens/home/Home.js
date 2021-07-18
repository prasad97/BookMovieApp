// Imports
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../../common/header/Header';

// Styles
import "./Home.css";
import { GridList, GridListTile,GridListTileBar } from '@material-ui/core';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
      },
    upcomingMoviesHeader:{
        textAlign: 'center',
        padding: '8px',
        background: '#ff9999',
        fontSize: '1rem',
    },
    upcomingMoviesGrid : {
        width:'100%',
        flexWrap: 'nowrap',
    }
});

class  Home extends Component {

    constructor() {
        super();
        this.state = {
            upcomingMovies: [{}],
        }
    }

    // Get Upcoming Movies
    getUpcomingMovies = async () => {
        const url = this.props.baseUrl + 'movies?status=PUBLISHED';

        try{
            const rawResponse = await fetch(url);

            if(rawResponse.ok){
                const response = await rawResponse.json();
                // console.log(response.movies);
                this.setState({upcomingMovies: response.movies});
            }
            else{
                const error = new Error();
                error.message = "Some Error Occurred";
                throw error;
            }
        }catch(e){
            alert(e.message);
        }
    }
    
    componentWillMount() {
        this.getUpcomingMovies();
    }

   
    render() {
        const {classes} = this.props;
        return (
            <div>
                {/* Header */}
                <Header  baseUrl={this.props.baseUrl}></Header>
                <div className={classes.upcomingMoviesHeader}>
                    Upcoming Movies
                </div>
                {/* Upcoming Movies */}
                <GridList cols={6} cellHeight={250} className={classes.upcomingMoviesGrid}>
                    {this.state.upcomingMovies.map(movie => {
                        return <GridListTile key={"up"+movie.id}>
                            <img src = {movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    })}
                </GridList>
                
                
                
            </div>
        )
    }
}

export default withStyles(useStyles)(Home);