/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import {
  Button,
  Header,
  Image,
  Modal,
} from 'semantic-ui-react';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <>
            <Modal
                {...this.props}
                >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Image
                    wrapped
                    size='medium'
                    src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
                    />
                    <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                        Weve found the following gravatar image associated with your
                        e-mail address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={(e) => this.props.onClose(e)}>
                    Nope
                    </Button>
                    <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Yep, that's me"
                    onClick={this.close}
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
  }
}
