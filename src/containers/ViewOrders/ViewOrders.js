import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import { Button } from 'antd';
import { default as Web3 } from 'web3';
import axios from 'axios';
import { getTokenNameFromAddress } from '../../utils';
import './ViewOrders.css';

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    const self = this;
    axios.get('http://localhost:8090/orders')
      .then((response) => {
        console.log(response.data);
        this.setState({
          orders: response.data.orders
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTakeOrder = (order) => {
    console.log(order);
  }

  render() {
    const { orders } = this.state;
    const orderNodes = orders.map(function (order, index) {
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
