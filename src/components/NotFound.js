import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    margin: '5rem'
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h3>404 page not found</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NotFound)));
