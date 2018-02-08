import React, { PureComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Layout from './components/Layout';

import './App.css';

const theme = createMuiTheme();

class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>
    );
  }
}

export default App;
