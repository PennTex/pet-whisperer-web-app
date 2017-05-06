import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import { initialLoginCheck } from './actions/authActions';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    color: "#121F28"
  },
  palette: {
    accent1Color: "#2EB1FF"
  }
});

store.dispatch(initialLoginCheck());

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);