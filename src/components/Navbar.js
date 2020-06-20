/* eslint-disable no-undef */
import React, { Component } from 'react';
import Styled from 'styled-components';
import { Button, Menu, Dropdown } from 'semantic-ui-react';

const Content = Styled.div`
    width: 100%;

    `;

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onLogout = () => {
    localStorage.removeItem('session');
    this.props.history.push('/');
  }

  render() {
    const { activeItem } = this.state;
    return (
            <>
                <Content>
                <Menu size='tiny'>
                  <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={this.handleItemClick}
                  />
                  {this.props.isLogin
                    && <Menu.Menu position='right'>
                        <Dropdown text='Setting' pointing className='link item'>
                          <Dropdown.Menu>
                            <Dropdown.Header>Settings</Dropdown.Header>
                            <Dropdown.Item onClick={this.onLogout}>Logout</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    <Menu.Item>
                      <Button primary>Home</Button>
                    </Menu.Item>
                  </Menu.Menu>
                  }
                </Menu>
                </Content>
            </>
    );
  }
}
