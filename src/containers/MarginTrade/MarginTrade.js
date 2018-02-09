import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
import { default as Web3 } from 'web3';
import axios from 'axios';

const MARKETS = {
  'OMG_ETH': { pair: 'OMG/ETH', loanToken: 'OMG' },
  'ZRX_ETH': { pair: 'ZRX/ETH', loanToken: 'ZRX' },
}
class CreateOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lenderAddress: "0x4fe5d34162fa812e7d71bd5305954f4733e92712",
      tokenPair: "OMG/ETH",
      loanQuantity: 100,
      loanToken: "OMG",
      costAmount: 10,
      costToken: "ETH"
    }

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleMarketChange = this.handleMarketChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMarketChange = (event) => {
    const state = this.state;
    const market = MARKETS[event.target.value];
    state['tokenPair'] = market.tokenPair;
    this.setState(state);
  }

  handleQuantityChange = (event) => {
    const state = this.state;
    state['loanQuantity'] = event.target.value;
    this.setState(state);
  }

  handleLoanTokenChange = (event) => {
    const state = this.state;
    state['loanToken'] = event.target.value;
    this.setState(state);
  }

  handleCostAmountChange = (event) => {
    const state = this.state;
    state['costAmount'] = event.target.value;
    this.setState(state);
  }

  handleCostTokenChange = (event) => {
    const state = this.state;
    state['costToken'] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { lenderAddress, tokenPair, loanQuantity, loanToken, costAmount, costToken } = this.state;
    const payload = {
      lenderAddress: lenderAddress,
      tokenPair: tokenPair,
      loanQuantity: loanQuantity,
      loanToken: loanToken,
      costAmount: costAmount,
      costToken: costToken
    };
    const web3 = new Web3(window.web3.currentProvider);

    web3.eth.getAccounts().then((accounts) => {
      return web3.eth.personal.sign(JSON.stringify(payload), accounts[0])
        .then((result) => {
          payload['ecSignature'] = result;
          return axios.post('http://localhost:8080/offers', payload).then((result) => {
            console.log(result);
          });
        })
    })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Form className="offer-form" onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="market" sm={2}>Market</Label>
          <Col sm={10}>
            <Input type="select" name="market" id="market" onChange={this.handleMarketChange}>
              <option value="OMG_ETH">OMG/ETH</option>
              <option value="ZRX_ETH">ZRX/ETH</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="quantity" sm={2}>Quantity</Label>
          <Col sm={10}>
            <Input value={this.state.loanQuantity} type="number" name="quantity" id="quantity"
              placeholder="1000" onChange={this.handleQuantityChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="loanToken" sm={2}>Loan Token</Label>
          <Col sm={10}>
            <Input value={this.state.loanToken} type="text" name="loanToken" id="loan-token"
              placeholder="OMG" onChange={this.handleLoanTokenChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Cost" sm={2}>Loan Cost</Label>
          <Col sm={5}>
            <Input value={this.state.costAmount} type="text" name="costAmount" id="costAmount"
              placeholder="100" onChange={this.handleCostAmountChange} />
          </Col>
          <Col sm={5}>
            <Input value={this.state.costToken} type="text" name="costToken" id="costToken"
              placeholder="100" onChange={this.handleCostTokenChange} />
          </Col>

        </FormGroup>
        <FormGroup row>
          <Col className="text-center">
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default CreateOffer;
