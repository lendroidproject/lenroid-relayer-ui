import React, { PureComponent } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Avatar, Alert } from 'antd';
import ViewOrders from '../ViewOrders/ViewOrders';
import MarginTrade from '../MarginTrade/MarginTrade';
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
      isLoggedIn: false
    }
  }

  componentDidMount () {
    setInterval(this._checkAccountStatus, 200);
  }

  _checkAccountStatus = () => {
    const {lendroid} = this.props;
    const web3 = lendroid.Web3;

    web3.eth.getAccounts((err, accounts) => {
      if (!accounts || accounts.length == 0) {
        this.setState({
          isLoggedIn: false
        });
      } else {
        this.setState({
          isLoggedIn: true
        });
      }
    });
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
                  <span className="web3-provider">
                    Meta Mask
                  </span>
                  <br/>
                  <span className="web3-address">
                    0x0980248324...1321
                  </span>
                </div>
                <Icon 
                  type="down"
                  className="menu-icon"
                />
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
            >
              <Menu.Item key="1">
                <NavLink to="/view-orders" activeClassName="active">
                  <Icon type="bars" />
                  <span>View Orders</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="2">
                <NavLink to="/margin-trade" activeClassName="active">
                  <Icon type="bar-chart" />
                  <span>Margin Trade</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
              position: 'relative',
            }}
          >
            <Switch>
              <Route
                exact
                path="/view-orders"
                render={ (routeProps)=> <ViewOrders {...routeProps} {...this.props} isLoggedIn={this.state.isLoggedIn}/> }
              />
              <Route
                exact
                path="/margin-trade"
                render={ (routeProps)=> <MarginTrade {...routeProps} {...this.props} isLoggedIn={this.state.isLoggedIn}/> }
              />
              <Redirect to="/view-orders"/>
            </Switch>
            {
              !this.state.isLoggedIn &&
                <Alert
                  message="Warning"
                  description="You haven't connected to any provider. Please try to login through Metamask"
                  type="warning"
                  showIcon
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
            }
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
