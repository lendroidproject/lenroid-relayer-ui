import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import { Button } from 'antd';
import { default as Web3 } from 'web3';
import axios from 'axios';
import { getTokenNameFromAddress } from '../../utils';
import './MarginTrade.css';

const dummyOrders = [
  {
    "exchangeContractAddress": "0x12459c951127e0c374ff9105dda097662a027093",
    "maker": "0x9e56625509c2f60af937f23b7b532600390e8c8b",
    "taker": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
    "makerTokenAddress": "0x323b5d4c32345ced77393b3530b1eed0f346429d",
    "takerTokenAddress": "0xef7fff64389b814a946f3e92105513705ca6b990",
    "feeRecipient": "0xb046140686d052fff581f63f8136cce132e857da",
    "makerTokenAmount": "10000000000000000",
    "takerTokenAmount": "20000000000000000",
    "makerFee": "100000000000000",
    "takerFee": "200000000000000",
    "expirationUnixTimestampSec": "42",
    "salt": "67006738228878699843088602623665307406148487219438534730168799356281242528500",
    "ecSignature": "0x61a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc33"
  },

];

const dummyOffers = [
  {

  }
]

class MarginTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      offers: [],
      matches: []
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
    console.log(match);
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
    );
  }
}

export default MarginTrade;
