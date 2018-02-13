import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './containers/MainLayout/MainLayout';
import { Lendroid } from 'lendroid';

const lendroid = new Lendroid({
  deployedConstants: { walletAddress: '0x464707b3e20c984856eb21cbb3bf29c14d74a3f1' } 
});

const App = (props) => (
  <Router>
    <MainLayout lendroid={lendroid}/>
  </Router>
);

export default App;