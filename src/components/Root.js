import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles';

import '../index.css'

import NotFound from './NotFound';
import Home from './Home';

const styles = theme => ({
  root: {
  }
});

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>
);

const mapStateToProps = (state, ownProps) => state;

export default connect(mapStateToProps)(withStyles(styles)(Root));
