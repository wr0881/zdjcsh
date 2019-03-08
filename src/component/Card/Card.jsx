import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { style, className, children, icon, operate = null, text } = this.props;
        return (
            <div className={`card ${className ? className : ''}`} style={style}>
                <div className="card-title">
                    <div className="card-title-icon">
                        <div className="card-title-icon-content">{icon}</div>
                    </div>
                    <div className="card-title-text">{text}</div>
                    <div className="card-title-operate">{operate}</div>
                </div>
                <div className="card-content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Card;