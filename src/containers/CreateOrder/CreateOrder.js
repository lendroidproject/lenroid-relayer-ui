import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, InputGroup } from 'reactstrap';
import { BigNumber } from 'bignumber.js';

class CreateOrder extends Component {
    constructor(props) {
        super(props);
        this.tokens = this.props.tokens;
        this.lendroid = this.props.lendroid;

        this.state = {
          exchangeContractAddress: '',
          maker:'',
          taker:'0x00000000000000000000000000000000',
          makerTokenAddress:'',
          takerTokenAddress:'',
          feeRecipient:'',
          makerTokenAmount:'',
          takerTokenAmount:'',
          makerFee:'',
          takerFee:'',
          expirationUnixTimestampSec:''
        }
        this.handleTakerFeeChange = this.handleTakerFeeChange.bind(this);
        this.handleExpireTimeStampChange = this.handleExpireTimeStampChange.bind(this);
        this.handleMakerFeeChange = this.handleMakerFeeChange.bind(this);
        this.handleTakerTokenAddressChange = this.handleTakerTokenAddressChange.bind(this);
        this.handleMakerTokenAddressChange = this.handleMakerTokenAddressChange.bind(this);
        this.handleMakerAddressChange = this.handleMakerAddressChange.bind(this);
        this.handleTakerAddressChange = this.handleTakerAddressChange.bind(this);
        this.handleFeeRecipientChange = this.handleFeeRecipientChange.bind(this);
        this.handleExchangeContractAddressChange = this.handleExchangeContractAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleExchangeContractAddressChange = (event) => {
        const state = this.state;
        state['exchangeContractAddress'] = event.target.value;
        this.setState(state);
    }
    
    handleMakerAddressChange = (event) => {
        const state = this.state;
        state['maker'] = event.target.value;
        this.setState(state);
    }
    handleTakerAddressChange = (event) => {
        const state = this.state;
        state['taker'] = event.target.value;
        this.setState(state);
    }
    handleMakerTokenAddressChange = (event) => {
        const state = this.state;
        state['makerTokenAddress'] = event.target.value;
        this.setState(state);
    }
    handleTakerTokenAddressChange = (event) => {
        const state = this.state;
        state['takerTokenAddress'] = event.target.value;
        this.setState(state);
    }

    handleFeeRecipientChange = (event) => {
        const state = this.state;
        state['feeRecipient'] = event.target.value;
        this.setState(state);
    }

    handleMakerTokenAmountChange = (event) => {
        const state = this.state;
        state['makerTokenAmount'] = event.target.value;
        this.setState(state);
    }
    handleTakerTokenAmountChange = (event) => {
        const state = this.state;
        state['takerTokenAmount'] = event.target.value;
        this.setState(state);
    }
    handleMakerFeeChange = (event) => {
        const state = this.state;
        state['makerFee'] = event.target.value;
        this.setState(state);
    }

    handleTakerFeeChange = (event) => {
        const state = this.state;
        state['takerFee'] = event.target.value;
        this.setState(state);
    }
    
    handleExpireTimeStampChange = (event) => {
        const state = this.state;
        state['expirationUnixTimestampSec'] = event.target.value;
        this.setState(state);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { exchangeContractAddress, maker, taker,makerTokenAddress,
                takerTokenAddress, feeRecipient, makerTokenAmount,
                takerTokenAmount, makerFee, takerFee, expirationUnixTimestampSec
              } = this.state

        const order = {
            exchangeContractAddress: exchangeContractAddress,
            maker: maker,
            taker: taker,
            makerTokenAddress: makerTokenAddress,
            takerTokenAddress: takerTokenAddress,
            feeRecipient:feeRecipient,
            makerTokenAmount: makerTokenAmount,
            takerTokenAmount: takerTokenAmount,
            makerTokenAmount: makerTokenAmount,
            makerFee: makerFee,
            takerFee: takerFee,
            expirationUnixTimestampSec: new Date(expirationUnixTimestampSec).getTime(),
            salt: new Date().getTime()
        }
        
        // Create orderHash
        // const orderHash = ZeroEx.getOrderHashHex(order);
        // 
        // // Signing orderHash -> ecSignature
        // const shouldAddPersonalMessagePrefix = false;
        // const ecSignature = await zeroEx.signOrderHashAsync(orderHash, makerAddress, shouldAddPersonalMessagePrefix);
        // 
        // // Appending signature to order
        // const signedOrder = {
        //     ...order,
        //     ecSignature,
        // };

    }

    render() {
        const { exchangeContractAddress, maker, taker,makerTokenAddress,
                takerTokenAddress, feeRecipient, makerTokenAmount,
                takerTokenAmount, makerFee, takerFee, expirationUnixTimestampSec
              } = this.state
        return (
            <Form className="order-form" onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="exchangeContractAddress" sm={2}>Exchange Contract Address</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="text" name="exchangeContractAddress" id="exchangeContractAddress"
                                   placeholder="0x Exchange.sol address" 
                                   onChange={this.handleExchangeContractAddressChange}
                                   value={this.exchangeContractAddress} />
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="makerAddress" sm={2}>Maker Address</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="text" name="makerAddress" id="makerAddress"
                                   placeholder="0x0000000000000000000000000000" 
                                   onChange={this.handleMakerAddressChange}
                                   value={this.makerAddress}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="takerAddress" sm={2}>Taker Address</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="text" name="takerAddress" id="takerAddress" disabled
                                   placeholder="0x0000000000000000000000000000"
                                   onChange={this.handleTakerAddressChange}
                                   value={this.takerAddress}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="makerTokenAddress" sm={2}>Maker Token Address</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="text" name="makerTokenAddress" id="makerTokenAddress"
                               placeholder="0x0000000000000000000000000000"
                               onChange={this.handleMakerTokenAddressChange}
                               value={this.makerTokenAddress}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="makerTokenAmount" sm={2}>Maker Token Amount</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="number" name="makerTokenAmount" id="makerTokenAmount"
                               placeholder="0"
                               onChange={this.handleMakerTokenAmountChange}
                               value={this.makerTokenAmount}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Taker Token Address</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="text" name="takerTokenAddress" id="takerTokenAddress"
                                placeholder="0x0000000000000000000000000000"
                                onChange={this.handleTakerTokenAddressChange}
                                value={this.takerTokenAmount}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="takerTokenAmount" sm={2}>Taker Token Amount</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="number" name="takerTokenAmount" id="takerTokenAmount"
                               placeholder="0"
                               onChange={this.handleTakerTokenAmountChange}
                               value={this.takerTokenAmount}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Maker Fee</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="number" name="makerFee" id="makerFee"
                                placeholder="0"
                                onChange={this.handleMakerFeeChange}
                                value={this.makerFee}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="takerFee" sm={2}>Taker Fee</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="number" name="takerFee" id="takerFee"
                                placeholder="0"
                                onChange={this.handleTakerFeeChange}
                                value={this.takerFee}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="feeRecipient" sm={2}>Fee Recipient</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="number" name="feeRecipient" id="feeRecipient"
                                placeholder="0"
                                onChange={this.handleFeeRecipientChange}
                                value={this.feeRecipient}/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="expirationUnixTimestampSec" sm={2}>Expiration <strong>(Unix Timestamp)</strong></Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input type="date" name="expirationUnixTimestampSec" id="expirationUnixTimestampSec"
                                onChange={this.handleExpireTimeStampChange}
                                value={this.expirationUnixTimestampSec}/>
                        </InputGroup>
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

export default CreateOrder;
