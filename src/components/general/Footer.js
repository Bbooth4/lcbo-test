import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Terms from '../general/Terms';
import Button from '@material-ui/core/Button';
import footerImg from '../../assets/footer.JPG'
import twitter from '../../assets/twitter.png'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const styles = theme => ({
	root: {
		marginTop: '8rem'
	},
	navSection: {
		position: 'relative',
		padding: '7rem 12rem',
		height: '100%'
	},
	navTitle: {
		color: 'white',
		fontSize: '1.6rem',
		fontWeight: '400',
		textTransform: 'uppercase'
	},
	navLinks: {
		color: 'white',
		cursor: 'pointer'
	},
	linksSection: {
		padding: '7rem'
	},
	linksWrap: {
		marginBottom: '10rem'
	},
	links: {
		color: '#414042',
		fontWeight: '600'
	},
	socialIcon: {
		display: 'inline-block',
		marginRight: '3rem',
		width: 25,
		'& img': {
			width: '100%'
		}
	},
  modalButton: {
    marginTop: '2rem',
    marginBottom: '2rem',
    marginRight: '2rem',
    display: 'inline'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class Footer extends Component {
	state = { open: false };

	render() {
		const { classes } = this.props;

		return <footer className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={8} className={classes.section1}>
            <div className={classes.navSection}>
              <div className="g-overlay-tint" />
              <div className="g-overlay-image" style={{ backgroundImage: `url(${footerImg})` }} />
              {this.props.children}
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.section2}>
            <div className={classes.linksSection}>
              <p>Text</p>
            </div>
          </Grid>
        </Grid>
      </footer>;
	}
}

const mapStateToProps = state => {
	return {
		user: state.users.User
	}
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Footer)));
