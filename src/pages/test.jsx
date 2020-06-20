import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import Styled from 'styled-components';

const Content = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

export default class test extends Component {
  render() {
    return (
            <>
            <Content>
                <div className="profile-card">
                    <div className="profile-card-head">
                        <img className="profile-img" src={require('../assets/avatar.png')}/>
                    </div>
                    <div className="profile-card-body">
                        <div className="profile-name">
                            Joey King
                        </div>
                        <div className="profile-desc">
                            UI/UX Designer
                        </div>
                        <div>
                        <Divider />
                            <Button primary>Update Profile</Button>
                        </div>
                    </div>
                </div>
            </Content>
            </>
    );
  }
}
