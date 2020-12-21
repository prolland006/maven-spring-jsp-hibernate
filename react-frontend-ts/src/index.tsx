import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from './store';
import App from "./App"
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

const rootElement = document.getElementById("root")

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
})

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  rootElement
)