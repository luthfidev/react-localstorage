import React, { Component } from 'react';
import Styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const Content = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    `;

export default class Notfound extends Component {
    goBack = (event) => {
      event.preventDefault();
      this.props.history.push('/login');
    }

    render() {
      return (
            <>
               <Content>
                   <h1>Page Not Found</h1>
                   <Button secondary onClick={this.goBack}>Back</Button>
               </Content>
            </>
      );
    }
}
