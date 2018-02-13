import React, { PureComponent } from 'react';
import { Col, Table } from 'reactstrap';
import { Button, Alert, Spin } from 'antd';
import { default as Web3 } from 'web3';
import axios from 'axios';
import { Lendroid } from 'lendroid';
import { getTokenNameFromAddress } from '../../utils';
import { SERVER_ORDERS, SERVER_OFFERS } from '../../config';

import './MarginTrade.css';

class MarginTrade extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      offers: [],
      matches: [],
      isLoading: false
    }
  }

  fetchMatchingOrders = async () => {
    let orders = [],
        offers = [],
        matches = [];

    this.setState({
      isLoading: true
    });

    try {
      const resOrders = await axios.get(SERVER_ORDERS);
      const resOffers = await axios.get(SERVER_OFFERS);
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

    this.setState({
      isLoading: false
    });
  }

  componentDidMount () {
    this.fetchMatchingOrders();
  }

  handleOpenPosition = (match) => {
    const {lendroid} = this.props;
  }

  render() {
    const { matches } = this.state;
    console.log(matches);
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
      <div
        className="margin-trade"
      >
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
        
        <div 
          style={{
            textAlign: 'center'
          }}
        >
          <Spin
            size="large"
            spinning={this.state.isLoading}
          />
        </div>
      </div>
    );
  }
}

export default MarginTrade;
