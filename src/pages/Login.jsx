import React, { Component } from 'react';
import Styled from 'styled-components';
import { Card, Form, Button } from 'semantic-ui-react';
import Swal from 'sweetalert2';

const Content = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    `;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePost = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    const isExist = JSON.parse(localStorage.getItem(userData.email));
    if (isExist) {
      if (isExist.email === this.state.email && isExist.password === this.state.password) {
        localStorage.setItem('session', isExist.email);
        this.props.history.push('/profile', isExist.email);
      } else {
        Swal.fire({
          title: 'Sorry !',
          text: 'Password Wrong',
          icon: 'warning',
        });
      }
    } else {
      Swal.fire({
        title: 'Sorry !',
        text: 'Please Register first !',
        icon: 'warning',
      });
    }
  }

  render() {
    return (
      <>
         <Content>
              <Card>
                  <Card.Content>
                  <Card.Header textAlign='center'>Register</Card.Header>
                      <Form onSubmit={this.handlePost}>
                      <Form.Field>
                      <label>Email</label>
                      <input name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email' />
                      </Form.Field>
                      <Form.Field>
                      <label>Password</label>
                      <input name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password' />
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
