import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store'
import { Provider } from "react-redux";
import { CssBaseline, MuiThemeProvider, responsiveFontSizes } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

let theme = createTheme({
  typography: {
    body2: {
      fontSize: '.8em',
    },
    caption: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    },
    MuiInputBase: {
      root: {
        fontSize: ".9em"
      }
    }
  }
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <CssBaseline>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App/>
      </MuiThemeProvider>
    </Provider>
  </CssBaseline>
  , document.getElementById('root')
);
