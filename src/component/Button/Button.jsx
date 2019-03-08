import React, { Component } from 'react';
import './Button.scss';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { children, style, className } = this.props;
        return (
            <div className={`button ${className || ''}`} style={style}>
                {children}
            </div>
        );
    }
}

export default Button;