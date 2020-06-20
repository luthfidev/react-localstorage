/* eslint-disable no-undef */
import React, { Component } from 'react';
import Styled from 'styled-components';
import {
  Button,
  Segment,
  Sidebar,
  Form,
  Card,
  Label,
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

  render() {
    const editModalClose = () => this.setState({ editModalShow: false });
    const { fullname, email, password } = this.state;
    return (
            <>
            <Content>
               <Sidebar.Pushable as={Segment}>
                <SideBar/>
                <Sidebar.Pusher>
                  <Segment basic>
                  <Card>
                    <EditProfile
                        size='tiny'
                        open={this.state.editModalShow}
                        onClose={editModalClose}
                        fullname={fullname}
                        email={email}
                        password={password}
                        refreshdata={(e) => this.fetchData(e)}
                    />
                        <Card.Content>
                        <Label as='a' color='red' ribbon='right'>
                          Profile
                        </Label>
                        <Card.Description>
                            <Form>
                            <Form.Field>
                            <label>Fullname</label>
                            <input disabled defaultValue={this.state.userData.fullname} placeholder='Fullname' />
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input disabled defaultValue={this.state.userData.email} placeholder='Email' />
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input disabled defaultValue={this.state.userData.password} placeholder='Password' />
                            </Form.Field>
                            </Form>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => {
                              this.setState({
                                editModalShow: true,
                                fullname: this.state.userData.fullname,
                                email: this.state.userData.email,
                                password: this.state.userData.password,
                              });
                            }}>
                                Update
                            </Button>
                            <Button basic color='red' onClick={this.onLogout}>
                                Logout
                            </Button>
                            </div>
                        </Card.Content>
                    </Card>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Content>
            </>
    );
  }
}
