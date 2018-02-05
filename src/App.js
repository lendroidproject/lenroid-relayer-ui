import React, { Component } from 'react';
import logo from './logo.svg';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Grid className="App" style={{ backgroundColor:"red" }}>
          <Row className="show-grid">
            <Col xs={12} md={8} lg={8} style={{ backgroundColor:"purple" }}>
              Rest of the code goes here
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
