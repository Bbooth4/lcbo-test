import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: '1em',
    textAlign: 'center',
    background: '#4988ed',
    color: '#fff',
    '&:hover': {
      background: '#7aadff'
    }
  }
});

class Nav extends Component {
  render() {
    const { classes } = this.props;

    return (
			<div className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs={3}>
						<div className={classes.paper}>xs=3</div>
					</Grid>
					<Grid item xs={3}>
						<div className={classes.paper}>xs=3</div>
					</Grid>
					<Grid item xs={6}>
						<div className={classes.paper}>xs=6</div>
					</Grid>
				</Grid>
			</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Nav)));

