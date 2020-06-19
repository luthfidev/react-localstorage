import React, { Component } from 'react';
import Styled from 'styled-components';
import { Card, Form, Button } from 'semantic-ui-react';

const Content = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    `;

export default class Login extends Component {
  render() {
    return (
      <>
         <Content>
              <Card>
                  <Card.Content>
                  <Card.Header textAlign='center'>Register</Card.Header>
                      <Form>
                      <Form.Field>
                      <label>Email</label>
                      <input placeholder='Email' />
                      </Form.Field>
                      <Form.Field>
                      <label>Password</label>
                      <input placeholder='Password' />
                      </Form.Field>
                      <Button type='submit'>Login</Button>
                      </Form>
                  </Card.Content>
              </Card>
          </Content>
      </>
    );
  }
}
