/* eslint-disable no-undef */
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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value});
  }

  handlePost = (event) => {
    event.preventDefault();
    const registerData = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
    };
    const email = JSON.parse(localStorage.getItem(registerData.email));
    if (email) {
      Swal.fire({
        title: 'Welcome !',
        text: 'Email is Exist',
        icon: 'warning',
      });
    } else {
      localStorage.setItem(registerData.email, JSON.stringify(registerData));
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
                            <label>Full Name</label>
                            <input name="fullname" value={this.state.fullname} onChange={this.handleChange} placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input name="email" value={this.state.email} onChange={this.handleChange} placeholder='Email' />
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input name="password" value={this.state.password} onChange={this.handleChange} placeholder='Password' />
                            </Form.Field>
                            <Button type='submit'>Register</Button>
                            </Form>
                        </Card.Content>
                    </Card>
                </Content>
            </>
    );
  }
}
