import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import { Button } from 'antd';
import { default as Web3 } from 'web3';
import axios from 'axios';
import { getTokenNameFromAddress } from '../../utils';
import './ViewOrders.css';

const orders = [
  {
    "exchangeContractAddress": "0x12459c951127e0c374ff9105dda097662a027093",
    "maker": "0x9e56625509c2f60af937f23b7b532600390e8c8b",
    "taker": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
    "makerTokenAddress": "0xcc2704ce33089d0f051eb0aff1750bb99fdfab46",
    "takerTokenAddress": "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    "feeRecipient": "0xb046140686d052fff581f63f8136cce132e857da",
    "makerTokenAmount": "10000000000000000",
    "takerTokenAmount": "20000000000000000",
    "makerFee": "100000000000000",
    "takerFee": "200000000000000",
    "expirationUnixTimestampSec": "42",
    "salt": "67006738228878699843088602623665307406148487219438534730168799356281242528500",
    "ecSignature": "0x61a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc33"
  },
  {
    "exchangeContractAddress": "0x12459c951127e0c374ff9105dda097662a027093",
    "maker": "0x9e56625509c2f60af937f23b7b532600390e8c8b",
    "taker": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
    "makerTokenAddress": "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    "takerTokenAddress": "0xcc2704ce33089d0f051eb0aff1750bb99fdfab46",
    "feeRecipient": "0xb046140686d052fff581f63f8136cce132e857da",
    "makerTokenAmount": "10000000000000000",
    "takerTokenAmount": "20000000000000000",
    "makerFee": "100000000000000",
    "takerFee": "200000000000000",
    "expirationUnixTimestampSec": "42",
    "salt": "67006738228878699843088602623665307406148487219438534730168799356281242528500",
    "ecSignature": "0x61a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc33"
  },
  {
    "exchangeContractAddress": "0x12459c951127e0c374ff9105dda097662a027093",
    "maker": "0x9e56625509c2f60af937f23b7b532600390e8c8b",
    "taker": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
    "makerTokenAddress": "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    "takerTokenAddress": "0xcc2704ce33089d0f051eb0aff1750bb99fdfab46",
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

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* orders: []          for test */
      orders: orders
    }
  }

  /* 
  componentDidMount() {
    const self = this;
    axios.get('http://localhost:8080/orders?address=' + this.props.lenderAddress)
      .then((response) => {
        console.log(response.data);
        this.setState({
          orders: response.data.orders
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } */

  handleTakeOrder = (order) => {
    console.log(order);
  }

  render() {
    const { orders } = this.state;
    const orderNodes = orders.map((order, index) => {
      return (
        <tr key={index}>
          <td>{getTokenNameFromAddress(order.makerTokenAddress)}</td>
          <td>{order.makerTokenAmount}</td>
          <td>{getTokenNameFromAddress(order.takerTokenAddress)}</td>
          <td>{order.takerTokenAmount} {order.costToken}</td>
          <td>
            <Button 
              type="primary"
              onClick={() => this.handleTakeOrder(order)}
              size="large"
            >
              Take
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <Table
        className="orders-table"
        striped
        hover
        responsive
      >
        <thead>
          <tr>
            <th>Maker Token</th>
            <th>Maker Amount</th>
            <th>Taker Token</th>
            <th>Taker Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderNodes}
        </tbody>
      </Table>
    );
  }
}

export default ViewOrders;
