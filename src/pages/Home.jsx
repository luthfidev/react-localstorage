/* eslint-disable no-undef */
import React, { Component } from 'react';
import Styled from 'styled-components';
import {
  Header,
  Segment,
  Sidebar,
  Menu,
  Button,
  Label,
  Placeholder,
} from 'semantic-ui-react';

import SideBar from '../components/SideBar';

const Content = Styled.div`
    width: 100%;
    height: 100%;
    `;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userData: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false }, () => {
        this.fetchData();
      });
    }, 5000);
  }

  fetchData = () => {
    const getSession = JSON.parse(localStorage.getItem('session'));
    if (!getSession) {
      this.props.history.push('/login');
    }
    const userData = JSON.parse(localStorage.getItem(getSession.email));
    this.setState({ userData });
  }

  handleAnimationChange = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  }

  render() {
    const imageProps = {
      avatar: true,
      spaced: 'right',
      src: require('../assets/avatar.png'),
    };
    const { visible, isLoading } = this.state;
    return (
            <>
            <Content>
               <Sidebar.Pushable as={Segment}>
               <SideBar
                 as={Menu}
                 animation='uncover'
                 icon='labeled'
                 inverted
                 vertical
                 visible={visible}
                 direction='left'
                 width='thin'
                />
                <Sidebar.Pusher>
                  <Segment basic>
                  <div style={{ marginBottom: 10 }}>
                      <Button icon='bars' secondary
                      onClick={this.handleAnimationChange}
                      ></Button>
                    </div>
                    {isLoading
                      && <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                      </Placeholder.Paragraph>
                    </Placeholder>
                    }
                    {!isLoading
                      && <Header as='h3'>Welcome, back <Label as='a' color='teal' content={this.state.userData.fullname} image={imageProps} /> !</Header>
                    }
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Content>
            </>
    );
  }
}
