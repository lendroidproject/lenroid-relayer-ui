import React, { PureComponent } from 'react';
import { Col, Table } from 'reactstrap';
import { Button, Dialog, Form, Input } from 'antd';
import { default as Web3 } from 'web3';
import axios from 'axios';
import { getTokenNameFromAddress } from '../../utils';
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

  handleCreateOrder = () => {
    this.setState({
      visible: true
    });
  }

  _renderCreateOrder = () => {
    const { visible, confirmLoading} = this.state;
    const { getFieldDecorator } = this.props;
    // return (
    //   <Dialog>
    //     <Form>
    //       <Form.Item>
    //         {
    //           getFieldDecorator("")
    //         }
    //       </Form.Item>
    //     </Form>
    //   </Dialog>
    // );
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
              <th></th>
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

const wrappedViewOrders = Form.create()(ViewOrders);

export default wrappedViewOrders;
