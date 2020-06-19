import React, { Component } from 'react';
import {Card, Button, Form } from 'semantic-ui-react';
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
      editModalShow: false,
    };
  }

  render() {

    const editModalClose = () => this.setState({ editModalShow: false });
    return (
            <>
                <Content>
                    <Card>
                    <EditProfile
                        dimmer='blurring'
                        open={this.state.editModalShow}
                        onClose={editModalClose}
                    />
                        <Card.Content>
                        <Card.Header textAlign='center'>Profile</Card.Header>
                        <Card.Description>
                            <Form>
                            <Form.Field>
                            <label>Fullname</label>
                            <input placeholder='Fullname' />
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email' />
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' />
                            </Form.Field>
                            </Form>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => {
                              this.setState({ editModalShow: true });
                            }}>
                                Update
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Content>
            </>
    );
  }
}
