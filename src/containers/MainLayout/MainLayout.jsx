import React, { PureComponent } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
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
      collapsed: false
    }
  }

  render() {
    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="app-logo">
            <h1>Relayer Portal</h1>
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
              minHeight: 280
            }}
          >
            <Switch>
              <Route exact path="/view-orders" component={ViewOrders}/>
              <Route exact path="/margin-trade" component={MarginTrade}/>
              <Redirect to="/view-orders"/>
            </Switch>
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
