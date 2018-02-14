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
    const fillTakerTokenAmount = match.order.takerTokenAmount;
    const takerToken = getTokenNameFromAddress(match.order.takerTokenAddress);
    const wranglerAddress = match.offer.wranglerAddress;

    this.setState({ confirmLoading: true });

    lendroid.openMarginTradingPosition(
      match.offer,
      match.order,
      fillTakerTokenAmount,
      takerToken,
      wranglerAddress
    ).then(() => {
      onClose();
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.setState({ confirmLoading: false });
    });
  }

  componentWillReceiveProps (newProps) {
    const { visible } = newProps;
    const { resetFields } = newProps.form;
    this.setState ({
      visible
    });
  }

  handleCancel = () => {
    const { onClose } = this.props;
    onClose();
  }

  render () {
    const { match } = this.props;

    return (
      <Modal
        title="Open Trade Position"
        visible={this.state.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
      >
        {
          (match && match.order && match.offer) && (
            <div>
              <h4>{match.offer.market} Market</h4>
              <h6>Maker Token: {getTokenNameFromAddress(match.order.makerTokenAddress)}</h6>
              <h6>Maker Token Amount: {match.order.makerTokenAmount}</h6><br/>
              <h6>Taker Token: {getTokenNameFromAddress(match.order.takerTokenAddress)}</h6>
              <h6>Taker Token Amount: {match.order.takerTokenAmount}</h6><br/>
    
              <h6>Loan Cost Token: {getTokenNameFromAddress(match.offer.loanCostTokenAddress)}</h6>
              <h6>Loan Cost Token Amount: {match.offer.loanCostTokenAmount}</h6><br/>
    
              <h6>Loan Interest Token: {getTokenNameFromAddress(match.offer.loanInterestTokenAddress)}</h6>
              <h6>Loan Interest Token Amount: {match.offer.loanInterestTokenAmount}</h6><br/>

              <h6>Wrangler Address: {match.offer.wranglerAddress || 'Not Defined!'} </h6>
            </div>
          )
        }
        

        {/* <Form>
          <Form.Item
            {...formItemLayout}
            label="Taker Token"
          >
            {
              getFieldDecorator('takerToken', {
                rules: [
                  { required: true, message: 'Please select a taker token' }
                ],
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
            {...formItemLayout}
            label="Amount"
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
            {...formItemLayout}
            label="Wrangler Address"
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
        </Form> */}
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
