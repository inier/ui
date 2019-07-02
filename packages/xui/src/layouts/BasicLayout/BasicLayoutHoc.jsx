import React, { Component } from 'react';
import BasePage from './BasePage';

const BasicLayoutHoc = (WrappedComponent) => {
    class Container extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        componentDidMount() {}

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
};

export default BasicLayoutHoc;
