/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import {
  Card,
  Form,
  Button,
} from 'semantic-ui-react';
import Swal from 'sweetalert2';

const Content = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80%;
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValid: false,
      password: '',
      passwordValid: false,
      formValid: false,
      errorMsg: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('session')) {
      this.props.history.push('/profile');
    }
  }

  validateForm = () => {
    const { emailValid, passwordValid } = this.state;
    this.setState({
      formValid: emailValid && passwordValid,
    });
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

    if (password === '') {
      passwordValid = false;
      errorMsg.password = 'Password required';
    } else if (password.length < 3) {
      passwordValid = false;
      errorMsg.password = 'Must be at least 3 characters long';
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  }

  handlePost = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false }, () => {
        const userData = {
          email: this.state.email,
          password: this.state.password,
        };
        const isExist = JSON.parse(localStorage.getItem(userData.email));
        if (isExist) {
          if (isExist.email === this.state.email && isExist.password === this.state.password) {
            const userSession = {
              email: this.state.email,
              exp: new Date().getTime() + 1000 * 5,
            };
            localStorage.setItem('session', JSON.stringify(userSession));
            this.props.history.push('/home', userSession);
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
      });
    }, 5000);
  }

  render() {
    const { formValid, isLoading } = this.state;
    return (
      <>
         <Content>
              <Card>
                  <Card.Content>
                  <Card.Header textAlign='center'>Login</Card.Header>
                      <Form onSubmit={this.handlePost}>
                      <Form.Field>
                      <label>Email</label>
                      <input name='email' readOnly={isLoading} value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} type='email' placeholder='Email' />
                      <ValidationMessage
                        valid={this.state.emailValid}
                        message={this.state.errorMsg.email} />
                      </Form.Field>
                      <Form.Field>
                      <label>Password</label>
                      <input name='password' readOnly={isLoading} value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)} placeholder='Password' />
                      <ValidationMessage
                        valid={this.state.passwordValid}
                        message={this.state.errorMsg.password} />
                      </Form.Field>
                      <Button type='submit' disabled={!formValid} loading={isLoading} primary>Login</Button>
                      <Link className="ui secondary button" to='/register'>Register</Link>
                      </Form>
                  </Card.Content>
              </Card>
          </Content>
      </>
    );
  }
}
