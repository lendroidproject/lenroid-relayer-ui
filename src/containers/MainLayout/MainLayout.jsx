import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import ViewOffers from '../ViewOffers/ViewOffers';
import CommitFunds from '../CommitFunds/CommitFunds';
import CreateOffer from '../CreateOffer/CreateOffer';
import DepositFunds from '../DepositFunds/DepositFunds';
import './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;

const UserMenu = (props) => (
  <Menu {...props}>
    <Menu.Item key="1">
      User Wallet
    </Menu.Item>
    <Menu.Item key="2">
      User Wallet
    </Menu.Item>
    <Menu.Item key="3">
      User Wallet
    </Menu.Item>
  </Menu>
);

class MainLayout extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      web3_address: '0x0980248324...1321'
    }
  }

  render() {
    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="app-logo">
            <h1>Lendroid</h1>
          </div>

          <div className="user-menu">
            <Dropdown overlay={<UserMenu/>}>
              <div className="user-avatar">
                <Avatar size="large">
                  <Icon type="user"/>
                </Avatar>
                <div className="wallet-info">
                  <span className="web3-provider">Meta Mask</span><br/>
                  <span className="web3-address">{this.state.web3_address}</span>
                </div>
                <Icon type="down" className="menu-icon"/>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Layout>
          <Sider
            collapsible
            onCollapse={this.handleSidebarCollapse}
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1">
                <Link to="/view-offers">
                  <Icon type="plus-square-o" />
                  <span>Offers</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/create-offer">
                  <Icon type="plus-square-o" />
                  <span>Create Offer</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="3">
                <Link to="/commit-funds">
                  <Icon type="upload" />
                  <span>Commit Funds</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="4">
                <Link to="/deposit-funds">
                  <Icon type="select" />
                  <span>Deposit Funds</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Route exact path="/view-offers" component={ViewOffers}/>
            <Route exact path="/commit-funds" component={CommitFunds}/>
            <Route exact path="/create-offer" component={CreateOffer}/>
            <Route exact path="/deposit-funds" component={DepositFunds}/>
          </Content>
        </Layout>
      </Layout>
    );
  }

  handleSidebarCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
}

export default MainLayout;
