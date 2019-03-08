import React, { Component } from 'react';
import './serveitem.scss';

class ServeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { value } = this.props;
        return (
            <div className='serve-item'>
                <div className="serve-item-img"><img src={value.img} alt="" /></div>
                <div className="serve-item-title">{value.title}</div>
                <div className="serve-item-dec">
                    <div className="serve-item-dec-title">{value.title}</div>
                    <div className="serve-item-dec-content">{value.dec}</div>
                </div>
            </div>
        );
    }
}

export default ServeItem;