import React, { Component } from 'react';
import { Card, Button, Form } from 'semantic-ui-react';
import Styled from 'styled-components';

import { EditProfile } from '../components/Profile/EditProfile';

const Content = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    `;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      editModalShow: false,
    };
  }

onLogout = () => {
  localStorage.removeItem('session');
  this.props.history.push('/login');
}

componentDidMount() {
  const email = this.props.location.state;
  const userData = JSON.parse(localStorage.getItem(email));
  this.setState({ userData });
}

render() {
  const editModalClose = () => this.setState({ editModalShow: false });
  const { fullname, email, password } = this.state;
  return (
            <>
                <Content>
                    <Card>
                    <EditProfile
                        size='tiny'
                        open={this.state.editModalShow}
                        onClose={editModalClose}
                        fullname={fullname}
                        email={email}
                        password={password}
                    />
                        <Card.Content>
                        <Card.Header textAlign='center'>Profile</Card.Header>
                        <Card.Description>
                            <Form>
                            <Form.Field>
                            <label>Fullname</label>
                            <input defaultValue={this.state.userData.fullname} placeholder='Fullname' />
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input defaultValue={this.state.userData.email} placeholder='Email' />
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input defaultValue={this.state.userData.password} placeholder='Password' />
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
                </Content>
            </>
  );
}
}
