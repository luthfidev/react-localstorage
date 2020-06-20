/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div className='ui pointing red basic label'>{props.message}</div>
    );
  }
  return (
      <div className='ui pointing green basic label'>Look Goods!</div>
  );
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      fullnameValid: false,
      email: '',
      emailValid: false,
      password: '',
      passwordValid: false,
      formValid: false,
      errorMsg: {},
    };
  }

  validateForm = () => {
    const { fullnameValid, emailValid, passwordValid } = this.state;
    this.setState({
      formValid: fullnameValid && emailValid && passwordValid,
    });
  }

  updateFullname = (fullname) => {
    this.setState({ fullname }, this.validateFullname);
  }

  validateFullname = () => {
    const { fullname } = this.state;
    let fullnameValid = true;
    const errorMsg = { ...this.state.errorMsg };

    if (fullname === '') {
      fullnameValid = false;
      errorMsg.fullname = 'Fullname required';
    } else if (fullname.length > 25) {
      fullnameValid = false;
      errorMsg.fullname = 'Fullname too long character';
    }
    this.setState({ fullnameValid, errorMsg }, this.validateForm);
  }

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  }

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    const errorMsg = { ...this.state.errorMsg };
    if (email === '') {
      emailValid = false;
      errorMsg.email = 'Email required';
    } else if (email.length < 3) {
      emailValid = false;
      errorMsg.email = 'Must be at least 3 characters long';
    } else if (!email.includes('@')) {
      emailValid = false;
      errorMsg.email = 'Invalid Email';
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  }

  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  }

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    const errorMsg = { ...this.state.errorMsg };

    const lowercase = new RegExp('^(?=.*[a-z])');
    const uppercase = new RegExp('^(?=.*[A-Z])');
    const numeric = new RegExp('^(?=.*[0-9])');
    const symbol = new RegExp('^(?=.*?[#?!@$%^&*-])');

    if (password === '') {
      passwordValid = false;
      errorMsg.password = 'Password required';
    } else if (password.length < 8) {
      passwordValid = false;
      errorMsg.password = 'Password too short';
    } else if (!lowercase.test(password)) {
      passwordValid = false;
      errorMsg.password = 'The string must contain at least 1 lowercase alphabetical character';
    } else if (!uppercase.test(password)) {
      passwordValid = false;
      errorMsg.password = 'The string must contain at least 1 uppercase alphabetical character';
    } else if (!numeric.test(password)) {
      passwordValid = false;
      errorMsg.password = 'The string must contain at least 1 numeric character';
    } else if (!symbol.test(password)) {
      passwordValid = false;
      errorMsg.password = 'At least one special character';
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
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
    const { formValid } = this.state;
    return (
            <>
                <Content>
                    <Card>
                        <Card.Content>
                        <Card.Header textAlign='center'>Register</Card.Header>
                            <Form onSubmit={this.handlePost}>
                            <Form.Field>
                            <label>Full Name</label>
                            <input name="fullname" value={this.state.fullname} onChange={(e) => this.updateFullname(e.target.value)} placeholder='First Name' />
                            <ValidationMessage
                              valid={this.state.fullnameValid}
                              message={this.state.errorMsg.fullname} />
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input name="email" value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} placeholder='Email' />
                            <ValidationMessage
                              valid={this.state.emailValid}
                              message={this.state.errorMsg.email} />
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input name="password" value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)} placeholder='Password' />
                            <ValidationMessage
                              valid={this.state.passwordValid}
                              message={this.state.errorMsg.password} />
                            </Form.Field>
                            <Button type='submit' disabled={!formValid} primary>Register</Button>
                            <Link className="ui secondary button" to='/'>Login</Link>
                            </Form>
                        </Card.Content>
                    </Card>
                </Content>
            </>
    );
  }
}
