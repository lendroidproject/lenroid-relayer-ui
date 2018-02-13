import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import { Button, Alert } from 'antd';
import { default as Web3 } from 'web3';
import axios from 'axios';
import { Lendroid } from 'lendroid';
import { getTokenNameFromAddress } from '../../utils';

import './MarginTrade.css';

class MarginTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      offers: [],
      matches: [],
      isLoggedIn: false
    }
  }

  fetchMatchingOrders = async () => {

    let orders = [],
        offers = [],
        matches = [];

    try {
      const resOrders = await axios.get('http://localhost:8090/orders');
      const resOffers = await axios.get('http://localhost:8080/offers');
      orders = resOrders.data.orders || [];
      offers = resOffers.data.offers || [];

      orders.forEach((order) => {
        offers.forEach((offer) => {
          if (order.makerTokenAddress === offer.loanTokenAddress && order.takerTokenAddress === offer.loanCostTokenAddress) {
            matches.push({
              order: order,
              offer: offer
            });
          }
        });
      });

      this.setState({offers, orders, matches});
    } catch (err) {
      console.log(err);
    };
    
  }

  componentDidMount() {
    
  }

  handleOpenPosition = (match) => {
    const {lendroid} = this.props;
    
  }

  render() {
    const { matches } = this.state;
    const matchesNodes = matches.map(function (match, index) {
      return (
        <tr key={index}>
          <td>{match.offer.market}</td>

          <td>{getTokenNameFromAddress(match.order.makerTokenAddress)}</td>
          <td>{match.order.makerTokenAmount}</td>
          <td>{match.order.makerFee}</td>

          <td>{getTokenNameFromAddress(match.order.takerTokenAddress)}</td>
          <td>{match.order.takerTokenAmount}</td>
          <td>{match.order.takerFee}</td>
          
          <td>
            <Button
              type="primary"
              onClick={() => this.handleOpenPosition(match)}
              size="large"
            >
             Open Position
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className="margin-trade">

        <Table
          className="matching-orders-table"
          striped
          hover
          responsive
        >
          <thead>
            <tr>
              <th>Market</th>
              <th>Maker Token</th>
              <th>Maker Amount</th>
              <th>Maker Fee</th>
              <th>Taker Token</th>
              <th>Taker Amount</th>
              <th>Taker Fee</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {matchesNodes}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MarginTrade;
