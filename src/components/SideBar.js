import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      isLoading: false,
    };
  }

  render() {
    return (

            <>
                <Sidebar
                 {...this.props}
                >
                  <Link to="/home">
                    <Menu.Item as='a'>
                        <Icon name='home' />
                        Dashboard
                    </Menu.Item>
                  </Link>
                  <Link to="/profile">
                    <Menu.Item as='a'>
                        <Icon name='id card outline' />
                        Profile
                  </Menu.Item>
                  </Link>
                </Sidebar>

            </>
    );
  }
}
