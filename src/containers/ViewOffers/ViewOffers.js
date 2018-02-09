import React, { Component } from 'react';
import { Col, Button, Table } from 'reactstrap';
import { default as Web3 } from 'web3';
import axios from 'axios';

const MARKETS = {
    'OMG_ETH': { pair: 'OMG/ETH', loanToken: 'OMG' },
    'ZRX_ETH': { pair: 'ZRX/ETH', loanToken: 'ZRX' },
}
class ViewOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
    }

    componentDidMount() {
        const self = this;
        axios.get('http://localhost:8080/offers?address='+this.props.lenderAddress)
        .then((response) => {
            console.log(response.data);
            this.setState({
                offers: response.data.offers
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {offers} = this.state;
        const offerNodes = offers.map(function(offer, index){
        return (
            <tr key={ index }>
                <td>{ offer.tokenPair }</td>
                <td>{ offer.loanToken }</td>
                <td>{ offer.loanQuantity }</td>
                <td>{ offer.costAmount } { offer.costToken }</td>
            </tr>
            );
        });
        return (
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>Market</th>
                    <th>Loan Token</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
                { offerNodes }
            </tbody>
        </Table>
        );
    }
}

export default ViewOffers;
