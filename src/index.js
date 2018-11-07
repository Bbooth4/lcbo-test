import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import reduxStore from './store/configureStore';
import Root from './components/Root';
import theme from './Theme';

let store = reduxStore.configureStore();

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Root store={store} history={reduxStore.history}/>
    </MuiThemeProvider>
  );
}

render (<App/>, document.getElementById('root'));
