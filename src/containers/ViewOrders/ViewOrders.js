import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import { Button } from 'antd';
import axios from 'axios';
import { getTokenNameFromAddress } from '../../utils';
import { SERVER_ORDERS } from '../../config';
import './ViewOrders.css';

class ViewOrders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      visible: false,
      confirmLoading: false
    }
  }

  componentDidMount() {
    axios.get(SERVER_ORDERS)
      .then((response) => {
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

  handleCreateOrder = () => {
    this.setState({
      visible: true
    });
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
          {/* <td>
            <Button
              onClick={() => this.handleTakeOrder(order)}
              size="large"
            >
              Take
            </Button>
          </td> */}
        </tr>
      );
    });

    return (
      <div className="view-orders">
        <Button 
          type="primary"
          size="large"
          onClick={this.handleCreateOrder}
          className="btn-create-order"
        >
          Create Order
        </Button>
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
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {orderNodes}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewOrders;
