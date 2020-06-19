/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import {
  Button,
  Form,
  Modal,
} from 'semantic-ui-react';
import Swal from 'sweetalert2';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.setState({
      fullname: this.props.fullname,
      email: this.props.email,
      password: this.props.password,
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePost = (event) => {
    event.preventDefault();
    const userData = {
      fullname: this.state.fullname || this.props.fullname,
      email: this.state.email || this.props.email,
      password: this.props.password || this.props.password,
    };
    const isExist = JSON.parse(localStorage.getItem(userData.email));
    if (isExist) {
      localStorage.setItem(userData.email, JSON.stringify(userData));
      this.props.onClose();
      this.props.refreshdata();
      Swal.fire({
        title: 'Success !',
        text: 'Profile has updated',
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Welcome !',
        text: 'Profile Not Found',
        icon: 'warning',
      });
    }
  }

  render() {
    return (
        <>
            <Modal
                {...this.props}
                >
                <Modal.Header>Update Profile</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form onSubmit={this.handlePost}>
                    <Form.Field>
                    <label>Fullname</label>
                    <input name='fullname' defaultValue={this.props.fullname} onChange={this.handleChange} placeholder='Fullname' />
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input name='email' defaultValue={this.props.email} onChange={this.handleChange} placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input name='password' defaultValue={this.props.password} onChange={this.handleChange} placeholder='Password' />
                    </Form.Field>
                    <Button color='green'>
                    Update
                    </Button>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={(e) => this.props.onClose(e)}>
                    No
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
  }
}
