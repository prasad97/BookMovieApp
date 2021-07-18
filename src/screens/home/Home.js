// Imports
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../../common/header/Header';

// Styles
import "./Home.css";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
      },
    upcomingMoviesHeader:{
        textAlign: 'center',
        padding: '8px',
        background: '#ff9999',
        fontSize: '1rem',
    }
});

class  Home extends Component {
   
    render() {
        const {classes} = this.props;
        return (
            <div>
                {/* Header */}
                <Header  baseUrl={this.props.baseUrl}></Header>
                <div className={classes.upcomingMoviesHeader}>
                    Upcoming Movies
                </div>
                <h1>Home Content</h1>
            </div>
        )
    }
}

export default withStyles(useStyles)(Home);