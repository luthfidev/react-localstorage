import React, { Component } from 'react';
import Styled from 'styled-components';
import {
  Header,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import SideBar from '../components/SideBar';

const Content = Styled.div`
    height: 100%;
    width: 100%;
    `;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };
  }

  render() {
    return (
            <>
            <Content>
               <Sidebar.Pushable as={Segment}>
                <SideBar/>
                <Sidebar.Pusher>
                  <Segment basic>
                    <Header as='h3'>Application Content</Header>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Content>
            </>
    );
  }
}
