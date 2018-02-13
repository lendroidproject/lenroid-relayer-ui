import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import { Button, Spin, Modal, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import { getTokenNameFromAddress } from '../../utils';
import { SERVER_ORDERS, SERVER_OFFERS } from '../../config';

import './MarginTrade.css';

class OpenPositionModal extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false
  };

  handleOk = () => {
    const { lendroid, match, onClose } = this.props;
    const { validateFields } = this.props.form;

    validateFields((err, values) => {
      if (!err) {
        const { fillTakerTokenAmount, takerToken, wranglerAddress } = values;

        this.setState({ confirmLoading: true });

        lendroid.openMarginTradingPosition(
          match.offer,
          match.order,
          fillTakerTokenAmount,
          takerToken,
          wranglerAddress,
        ).then(() => {
          onClose();
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          this.setState({ confirmLoading: false });
        });
      }
    });
  }

  componentWillReceiveProps (newProps) {
    const { visible } = newProps;
    this.setState ({
      visible
    });
  }

  handleCancel = () => {
    const { onClose } = this.props;
    onClose();
  }

  render () {
    
    const { getFieldDecorator } = this.props.form;
    const tokenSymbols = ['OMG', 'ETH', 'ZRX'];

    return (
      <Modal
        title="Open Trade Position"
        visible={this.state.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item
            label="Taker Token"
            colon={false}
          >
            {
              getFieldDecorator('takerToken', {
                rules: [
                  { required: true, message: 'Please select a taker token' }
                ]
              })(
                <Select
                  placeholder="Select a loan token"
                  size="large"
                >
                  {
                    tokenSymbols.map((token) => (
                      <Select.Option
                        key={token}
                        value={token}
                      >
                        {token}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>

          <Form.Item
            label="Amount"
            colon={false}
          >
            {getFieldDecorator('fillTakerTokenAmount', {
              rules: [{ required: true, message: 'Please input token amount of taker' }],
            })(
              <InputNumber
                size="large"
                min={1}
                style={{
                  width: '100%'
                }}
              />
            )}
          </Form.Item>

          <Form.Item
            label="Wrangler Address"
            colon={false}
          >
            {getFieldDecorator('wranglerAddress', {
              rules: [],
            })(
              <Input
                size="large"
                style={{
                  width: '100%'
                }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
};

const WrappedModal = Form.create()(OpenPositionModal);

class MarginTrade extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      offers: [],
      matches: [],
      isLoading: false,

      currentMatch: undefined,
      isModalOpened: false,
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

      this.setState({ offers, orders, matches });
    } catch (err) {
      console.log(err);
    };

    this.setState({
      isLoading: false
    });
  }

  componentDidMount() {
    this.fetchMatchingOrders();
  }

  handleModalOpen = (match) => {
    this.setState({
      currentMatch: match,
      isModalOpened: true
    });
  }

  handleModalClose = () => {
    this.setState({
      currentMatch: undefined,
      isModalOpened: false
    })
  }

  render() {
    const { matches } = this.state;

    const matchesNodes = matches.map((match, index) => {
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
              onClick={() => this.handleModalOpen(match)}
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

        <WrappedModal
          lendroid={this.props.lendroid}
          match={this.state.currentMatch}
          visible={this.state.isModalOpened}
          onClose={this.handleModalClose}
        />
      </div>
    );
  }
}

export default MarginTrade;
