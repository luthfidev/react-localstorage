/* eslint-disable no-undef */
import React, { Component } from 'react';
import Styled from 'styled-components';
import {
  Button,
  Segment,
  Sidebar,
  Divider,
  Menu,
} from 'semantic-ui-react';
import SideBar from '../components/SideBar';

import { EditProfile } from '../components/Profile/EditProfile';

const Content = Styled.div`
    height: 100%;
    width: 100%;
    `;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'profile',
      userData: [],
      editModalShow: false,
      visible: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onLogout = () => {
    localStorage.removeItem('session');
    this.props.history.push('/');
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
    const editModalClose = () => this.setState({ editModalShow: false });
    const {
      fullname,
      email,
      password,
      visible,
    } = this.state;
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
                    <EditProfile
                        size='tiny'
                        open={this.state.editModalShow}
                        onClose={editModalClose}
                        fullname={fullname}
                        email={email}
                        password={password}
                        refreshdata={(e) => this.fetchData(e)}
                    />
                       <div className="profile-card">
                          <div className="profile-card-head">
                              <img className="profile-img" src={require('../assets/avatar.png')}/>
                          </div>
                          <div className="profile-card-body">
                              <div className="profile-name">
                              {this.state.userData.fullname}
                              </div>
                              <div className="profile-desc">
                              {this.state.userData.email}
                              </div>
                              <div>
                              <Divider />
                                  <Button primary onClick={() => {
                                    this.setState({
                                      editModalShow: true,
                                      fullname: this.state.userData.fullname,
                                      email: this.state.userData.email,
                                      password: this.state.userData.password,
                                    });
                                  }}
                                  >Update</Button>
                                  <Button basic color='red' onClick={this.onLogout}>
                                Logout
                            </Button>
                              </div>
                          </div>
                      </div>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Content>
            </>
    );
  }
}
