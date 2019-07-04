import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { handleOnclick } = this.props;

    return (<button onClick={handleOnclick} >react button</button>);
  }
}

export default Button;
